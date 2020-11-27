<template>
  <PageWrapper>
    <div class="flex flex-col items-center">
      <div class="prose prose-lg py-6">
        <h2 v-if="profile">Hallo {{ profile.name }}!</h2>
        <h2 v-else>Scanne deinen Login-Code!</h2>
      </div>

      <div class="flex flex-col items-center">
        <div class="py-5">
          <QrCodeScanner
            :query-params="query"
            @valid-journcoin="$router.push('/token')"
            @invalid-journcoin="error = 'invalid-journcoin'"
            @unknown-qr-code="error = 'unknown-qr-code'"
          />
        </div>
        <Spinner v-if="authLoading || walletLoading" />
        <section v-else class="prose text-center">
          <h3 v-if="profile">
            Bislang hast du {{ budget }} JournCoins gescannt.
          </h3>
          <p v-if="error" class="bg-red-500 py-2 px-4 w-full text-white shadow">
            <template v-if="error === 'unknown-qr-code'">
              Der letzte gescannte QR-Code sah nicht so aus, als gehörte er zu
              dieser App!
            </template>
            <template v-if="error === 'invalid-journcoin'">
              Dieser JournCoin ist bereits von jemandem ausgegeben worden!
            </template>
          </p>
        </section>
      </div>
    </div>

    <template #footer>
      <Navigation v-if="profile" :links="links" />
    </template>
  </PageWrapper>
</template>

<script>
import { mapGetters } from 'vuex'
import Spinner from '~/components/Spinner/Spinner'
import PageWrapper from '~/components/PageWrapper/PageWrapper.vue'
import QrCodeScanner from '~/components/QrCodeScanner/QrCodeScanner.vue'
import Navigation from '~/components/Navigation/Navigation.vue'

export default {
  components: { PageWrapper, QrCodeScanner, Navigation, Spinner },
  data() {
    const { query } = this.$route
    return {
      query,
      error: null,
      links: [
        { to: '/article', label: 'Artikel auswählen' },
        { to: '/profile', label: 'Zur Autorenseite' },
      ],
    }
  },
  computed: {
    ...mapGetters({
      walletLoading: 'wallet/loading',
      authLoading: 'auth/loading',
      budget: 'wallet/budget',
      profile: 'auth/profile',
    }),
  },
}
</script>
