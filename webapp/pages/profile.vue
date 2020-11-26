<template>
  <PageWrapper title="Dein Profil">
    <Icon
      v-if="$apollo.queries.profile.loading"
      class="h-10 w-10 animate-spin"
      name="spinner"
    />
    <template v-else>
      <div class="flex flex-col items-center">
        <article v-if="profile" class="prose py-6">
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
      <div class="flex flex-row justify-items-auto">
        <nuxt-link
          to="/"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          QR code scannen
        </nuxt-link>
        <nuxt-link
          to="/article"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Artikel auswählen
        </nuxt-link>
      </div>
    </template>
  </PageWrapper>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Icon from '~/components/Icon/Icon.vue'
import { JOURNCOINS, PROFILE } from '~/graphql/queries'

export default {
  middleware: ['isAuth'],
  components: { Icon },
  apollo: {
    journCoins: {
      query: JOURNCOINS,
      result(res, key) {
        this.updateRemoteTokens(res.data[key].map((coin) => coin.token))
      },
    },
    profile: PROFILE,
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
