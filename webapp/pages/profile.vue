<template>
  <PageWrapper title="Mein Profil">
    <ApolloQuery :query="PROFILE" notify-on-network-status-change>
      <template v-slot="{ result: { loading, error, data } }">
        <div class="flex flex-col items-center">
          <Spinner v-if="loading" />
          <div v-if="error" class="error apollo">An error occurred</div>
          <template v-else-if="data">
            <article class="prose py-6">
              <h1>Hallo {{ data.profile.name }}</h1>
              <p>
                Du hast {{ data.profile.articles.length }} Artikel geschrieben
                und dafür bereits {{ earned(data.profile.articles) }} JournCoins
                erhalten.
              </p>
              <p>
                Außerdem hast du schon
                {{ data.profile.journCoins.length }} Artikel gekauft und noch
                {{ available }} JournCoins übrig.
              </p>
            </article>
          </template>
        </div>
      </template>
    </ApolloQuery>
    <template v-slot:footer>
      <Navigation :links="links" />
    </template>
  </PageWrapper>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { ApolloQuery } from 'vue-apollo'
import Spinner from '~/components/Spinner/Spinner.vue'
import { JOURNCOINS, PROFILE } from '~/graphql/queries'
import Navigation from '~/components/Navigation/Navigation.vue'

export default {
  components: { Spinner, Navigation, ApolloQuery },
  apollo: {
    journCoins: {
      query: JOURNCOINS,
      result(res, key) {
        this.updateRemoteTokens(res.data[key].map((coin) => coin.token))
      },
    },
  },
  data() {
    return {
      PROFILE,
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
  },
  methods: {
    ...mapMutations({
      updateRemoteTokens: 'localJournCoins/updateRemoteTokens',
    }),
    earned(articles) {
      return articles
        .map((article) => article.journCoins.length)
        .reduce((a, b) => a + b, 0)
    },
  },
}
</script>
