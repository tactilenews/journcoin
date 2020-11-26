<template>
  <PageWrapper title="QR Code scannen">
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
    <Navigation :links="links" />
  </PageWrapper>
</template>

<script>
import decode from 'jwt-decode'
import { mapMutations } from 'vuex'
import PageWrapper from '~/components/PageWrapper/PageWrapper.vue'
import QrCodeScanner from '~/components/QrCodeScanner/QrCodeScanner.vue'
import Navigation from '~/components/Navigation/Navigation.vue'

export default {
  components: { PageWrapper, QrCodeScanner, Navigation },
  data() {
    return {
      links: [
        { to: '/article', label: 'Artikel auswählen' },
        { to: '/profile', label: 'Mein Profil' },
      ],
    }
  },
  mounted() {
    const { jwt } = this.$route.query
    if (jwt) this.dispatch(jwt)
  },
  methods: {
    ...mapMutations({
      saveScannedJournCoin: 'localJournCoins/add',
    }),
    async dispatch(jwt) {
      const { person, coin } = decode(jwt)
      if (person) {
        await this.$apolloHelpers.onLogin(jwt)
        this.$router.push('/profile')
      }
      if (coin) {
        this.saveScannedJournCoin(jwt)
      }
    },
  },
}
</script>
