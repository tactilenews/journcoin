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
          <QrCodeScanner @parse="dispatch" />
        </div>
        <strong v-if="isAuthenticated">
          Bislang hast du {{ earned }} JournCoins gescanned!
        </strong>
      </div>
    </div>
    <Navigation v-if="isAuthenticated" :links="links" />
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
      links: [
        { to: '/article', label: 'Artikel auswählen' },
        { to: '/profile', label: 'Mein Profil' },
      ],
    }
  },
  computed: {
    ...mapGetters({
      earned: 'localJournCoins/available',
      isAuthenticated: 'auth/isAuthenticated',
    }),
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
