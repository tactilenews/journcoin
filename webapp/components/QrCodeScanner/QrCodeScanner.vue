<template>
  <div class="h-64 w-64 bg-red-600">
    <client-only>
      <qrcode-stream class="m-auto" @decode="onDecode"></qrcode-stream>
    </client-only>
  </div>
</template>

<script>
export const validJournCoin = (decodedString, hostUrl) => {
  try {
    const url = new URL(decodedString)
    if (url.hostname !== hostUrl.hostname) return null
    return url.searchParams.get('jwt')
  } catch (e) {
    return null
  }
}

export default {
  methods: {
    onDecode(decodedString) {
      const decoded = validJournCoin(decodedString, new URL(this.$config.URL))
      if (!decoded) {
        this.$emit('unknown-qr-code', decodedString)
      } else {
        this.$emit('parse', decoded)
      }
    },
  },
}
</script>
