<template>
  <PageWrapper title="Mein Profil">
    <ApolloQuery :query="PROFILE" notify-on-network-status-change>
      <template #default="{ result: { loading, error, data } }">
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
    <template #footer>
      <Navigation :links="links" />
    </template>
  </PageWrapper>
</template>

<script>
import { mapGetters } from 'vuex'
import { ApolloQuery } from 'vue-apollo'
import Spinner from '~/components/Spinner/Spinner.vue'
import { PROFILE } from '~/graphql/queries'
import Navigation from '~/components/Navigation/Navigation.vue'

export default {
  components: { Spinner, Navigation, ApolloQuery },
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
      available: 'wallet/budget',
    }),
  },
  methods: {
    earned(articles) {
      return articles
        .map((article) => article.journCoins.length)
        .reduce((a, b) => a + b, 0)
    },
  },
}
</script>
