<template>
  <PageWrapper title="JournCoin">
    <div class="flex flex-col items-center">
      <article class="prose py-6">
        <h1>Löse Deine JournCoins ein!</h1>
        <p>JournCoin ist die neue Währung für guten Journalismus.</p>
        <p>
          Du hast ein Produkt mit einem JournCoin-Sticker gekauft? Hol dir deine
          gratis Story!
        </p>
      </article>
      <div class="max-w-md">
        <QrCodeScanner @parse="dispatch" />
      </div>
    </div>
  </PageWrapper>
</template>

<script>
import decode from 'jwt-decode'
import PageWrapper from '~/components/PageWrapper/PageWrapper.vue'
import QrCodeScanner from '~/components/QrCodeScanner/QrCodeScanner.vue'

export default {
  components: { PageWrapper, QrCodeScanner },
  mounted() {
    const { jwt } = this.$route.query
    if (jwt) this.dispatch(jwt)
  },
  methods: {
    async dispatch(jwt) {
      const { person } = decode(jwt)
      if (person) {
        await this.$apolloHelpers.onLogin(jwt)
        this.$router.push('/profile')
      }
    },
  },
}
</script>
