<template>
  <PageWrapper title="Dein Profil">
    <div class="flex flex-col items-center">
      <article v-if="profile" class="prose py-6">
        <h1>Hallo {{ profile.name }}</h1>
        <p>
          Du hast {{ profile.articles.length }} Artikel geschrieben und dafür
          bereits {{ earned }} JournCoins erhalten.
        </p>
        <p>
          Außerdem hast du schon {{ profile.journCoins.length }} Artikel
          gekauft.
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
  </PageWrapper>
</template>

<script>
import gql from 'graphql-tag'

const PROFILE = gql`
  query {
    profile {
      id
      name
      articles {
        id
        title
        slug
        teaser
        journCoins {
          token
        }
      }
      journCoins {
        token
        article {
          id
          title
          slug
          teaser
        }
      }
    }
  }
`
const JOURNCOINS = gql`
  query {
    journCoins(stage: DRAFT, locales: en) {
      id
    }
  }
`

export default {
  middleware: ['isAuth'],
  apollo: {
    journCoins: JOURNCOINS,
    profile: PROFILE,
  },
  computed: {
    earned() {
      return this.profile.articles
        .map((article) => article.journCoins.length)
        .reduce((a, b) => a + b, 0)
    },
  },
}
</script>
