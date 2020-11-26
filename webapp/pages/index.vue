<template>
  <PageWrapper>
    <div class="flex flex-col items-center">
      <div class="prose py-6">
        <h1 v-if="isAuthenticated">Scanne deine JournCoins!</h1>
        <h1 v-else>Scanne deinen Login-Code!</h1>
      </div>

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
      earned: 'wallet/budget',
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
      saveScannedJournCoin: 'wallet/add',
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
