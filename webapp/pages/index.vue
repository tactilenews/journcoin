<template>
  <PageWrapper title="QR Code scannen">
    <div class="flex flex-col items-center">
      <article class="prose py-6">
        <template v-if="isAuthenticated">
          <h1>Löse Deine JournCoins ein!</h1>
          <p>JournCoin ist die neue Währung für guten Journalismus.</p>
          <p>
            Du hast ein Produkt mit einem JournCoin-Sticker gekauft? Hol dir
            deine gratis Story!
          </p>
        </template>
        <template v-else>
          <h1>Scanne einen Login QR code!</h1>
        </template>
      </article>

      <div class="flex flex-col items-center">
        <div class="py-5">
          <QrCodeScanner
            @parse="dispatch"
            @unknown-qr-code="unknownQrCode = true"
          />
        </div>
        <strong v-if="isAuthenticated">
          Bislang hast du {{ earned }} JournCoins gescanned!
        </strong>
        <strong v-if="unknownQrCode">
          Das sieht nicht wie ein QR code von dieser App aus!
        </strong>
      </div>
    </div>

    <template #footer>
      <Navigation v-if="isAuthenticated" :links="links" />
    </template>
  </PageWrapper>
</template>

<script>
import decode from 'jwt-decode'
import { mapMutations, mapGetters } from 'vuex'
import PageWrapper from '~/components/PageWrapper/PageWrapper.vue'
import QrCodeScanner from '~/components/QrCodeScanner/QrCodeScanner.vue'
import Navigation from '~/components/Navigation/Navigation.vue'

export default {
  components: { PageWrapper, QrCodeScanner, Navigation },
  data() {
    return {
      unknownQrCode: false,
      links: [
        { to: '/article', label: 'Artikel auswählen' },
        { to: '/profile', label: 'Mein Profil' },
      ],
    }
  },
  computed: {
    ...mapGetters({
      earned: 'localJournCoins/available',
    }),
    isAuthenticated() {
      return !!this.$apolloHelpers.getToken()
    },
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
      this.unknownQrCode = false
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
