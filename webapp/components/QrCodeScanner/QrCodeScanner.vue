<template>
  <div class="h-64 w-64 bg-red-600">
    <client-only>
      <qrcode-stream class="m-auto" @decode="onDecode"></qrcode-stream>
    </client-only>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import jwtDecode from 'jwt-decode'

export const qrCodePayload = (decodedString, hostUrl) => {
  try {
    const url = new URL(decodedString)
    if (url.hostname !== hostUrl.hostname) return null
    return url.searchParams.get('jwt')
  } catch (e) {
    return null
  }
}

export default {
  props: {
    queryParams: { type: Object, default: () => ({}) },
  },
  async created() {
    const { jwt } = this.queryParams
    if (jwt) await this.dispatch(jwt)
  },
  methods: {
    ...mapMutations({
      addCoin: 'wallet/add',
    }),
    async onDecode(decodedString) {
      const jwt = qrCodePayload(decodedString, new URL(this.$config.URL))
      if (!jwt) return this.$emit('unknown-qr-code', decodedString)
      await this.dispatch(jwt)
    },
    async dispatch(jwt) {
      const { person, coin } = jwtDecode(jwt)
      if (person) {
        await this.$store.dispatch('auth/login', jwt)
      }
      if (coin) {
        try {
          const newCoin = await this.$store.dispatch('wallet/earn', jwt)
          if (newCoin) this.$emit('valid-journcoin')
        } catch (e) {
          this.$emit('invalid-journcoin')
        }
      }
    },
  },
}
</script>
