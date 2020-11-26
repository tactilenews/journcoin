<template>
  <PageWrapper title="Mein Profil">
    <Icon
      v-if="$apollo.queries.profile.loading"
      class="h-10 w-10 animate-spin"
      name="spinner"
    />
    <template v-else>
      <div class="flex flex-col items-center">
        <article class="prose py-6">
          <h1>Hallo {{ profile.name }}</h1>
          <p>
            Du hast {{ profile.articles.length }} Artikel geschrieben und dafür
            bereits {{ earned }} JournCoins erhalten.
          </p>
          <p>
            Außerdem hast du schon {{ profile.journCoins.length }} Artikel
            gekauft und noch {{ available }} JournCoins übrig.
          </p>
        </article>
      </div>
      <Navigation :links="links" />
    </template>
  </PageWrapper>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Icon from '~/components/Icon/Icon.vue'
import { JOURNCOINS, PROFILE } from '~/graphql/queries'
import Navigation from '~/components/Navigation/Navigation.vue'

export default {
  components: { Icon, Navigation },
  apollo: {
    journCoins: {
      query: JOURNCOINS,
      result(res, key) {
        this.updateRemoteTokens(res.data[key].map((coin) => coin.token))
      },
    },
    profile: PROFILE,
  },
  data() {
    return {
      links: [
        { to: '/', label: 'QR Code scannen' },
        { to: '/article', label: 'Artikel auswählen' },
      ],
    }
  },
  computed: {
    ...mapGetters({
      available: 'localJournCoins/available',
    }),
    earned() {
      return this.profile.articles
        .map((article) => article.journCoins.length)
        .reduce((a, b) => a + b, 0)
    },
  },
  methods: {
    ...mapMutations({
      updateRemoteTokens: 'localJournCoins/updateRemoteTokens',
    }),
  },
}
</script>
