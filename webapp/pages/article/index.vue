<template>
  <PageWrapper title="Welchen Artikel möchtest du lesen?">
    <ApolloQuery :query="ARTICLE_PREVIEW" notify-on-network-status-change>
      <template #default="{ result: { loading, error, data } }">
        <div v-if="data" class="flex flex-col items-center">
          <Spinner v-if="loading" />
          <div v-if="error" class="error apollo">An error occurred</div>
          <ArticlePreview
            v-for="article in data.articles"
            :key="article.slug"
            :article="article"
            :current-user-id="currentUserId"
            @read="read"
          />
        </div>
      </template>
    </ApolloQuery>
    <template #footer>
      <Navigation :links="links" />
    </template>
  </PageWrapper>
</template>

<script>
import { ApolloQuery } from 'vue-apollo'
import decode from 'jwt-decode'
import ArticlePreview from '~/components/ArticlePreview/ArticlePreview.vue'
import { ARTICLE_PREVIEW } from '~/graphql/queries'
import Spinner from '~/components/Spinner/Spinner.vue'
import Navigation from '~/components/Navigation/Navigation.vue'

export default {
  components: { Spinner, Navigation, ApolloQuery, ArticlePreview },
  data() {
    return {
      ARTICLE_PREVIEW,
      links: [
        { to: '/', label: 'QR Code scannen' },
        { to: '/profile', label: 'Mein Profil' },
      ],
    }
  },
  computed: {
    currentUserId() {
      const jwt = this.$apolloHelpers.getToken()
      const {
        person: { id },
      } = decode(jwt)
      return id
    },
  },
  methods: {
    read(slug) {
      this.$router.push({ name: 'article-slug', params: { slug } })
    },
  },
}
</script>
