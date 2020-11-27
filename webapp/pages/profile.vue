<template>
  <PageWrapper>
    <ApolloQuery :query="PROFILE" notify-on-network-status-change>
      <template #default="{ result: { loading, error, data } }">
        <div class="flex flex-col items-center">
          <Spinner v-if="loading" />
          <div v-if="error" class="error apollo">An error occurred</div>
          <template v-else-if="data">
            <article class="prose prose-lg py-6">
              <h2>Autorenseite von {{ profile.name }}</h2>
              <p>
                Du hast
                <strong
                  >{{ data.profile.articles.length }} Artikel
                  geschrieben</strong
                >
                und dadurch insgesamt
                <strong
                  >{{ earned(data.profile.articles) }} JournCoins
                  verdient</strong
                >. Außerdem hast du schon
                <strong
                  >{{ data.profile.journCoins.length }} Artikel gekauft</strong
                >
                und ein Budget von noch
                <strong>{{ budget }} JournCoins</strong> übrig.
              </p>
              <section>
                <h3>Einnahmen</h3>
                <table>
                  <tr>
                    <th>Artikel</th>
                    <th>JournCoins</th>
                  </tr>
                  <tr
                    v-for="article in data.profile.articles"
                    :key="article.slug"
                  >
                    <td>{{ article.title }}</td>
                    <td>{{ article.journCoins.length }}</td>
                  </tr>
                </table>
              </section>
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
        { to: '/', label: 'JournCoins scannen' },
        { to: '/article', label: 'Artikel auswählen' },
      ],
    }
  },
  computed: {
    ...mapGetters({
      budget: 'wallet/budget',
      profile: 'auth/profile',
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
