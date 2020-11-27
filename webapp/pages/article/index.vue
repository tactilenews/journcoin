<template>
  <PageWrapper>
    <div class="flex flex-col items-center">
      <div class="prose prose-lg py-6">
        <h2>Welchen Artikel möchtest du lesen?</h2>
      </div>
      <ApolloQuery :query="ARTICLE_PREVIEW" notify-on-network-status-change>
        <template #default="{ result: { loading, error, data } }">
          <Spinner v-if="loading" />
          <div v-if="data" class="flex flex-col items-center">
            <div v-if="error" class="error apollo">An error occurred</div>
            <ArticlePreview
              v-for="article in data.articles"
              :key="article.slug"
              :article="article"
              @read="read"
            />
          </div>
        </template>
      </ApolloQuery>
    </div>
    <template #footer>
      <Navigation :links="links" />
    </template>
  </PageWrapper>
</template>

<script>
import { ApolloQuery } from 'vue-apollo'
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
        { to: '/', label: 'JournCoins scannen' },
        { to: '/profile', label: 'Zur Autorenseite' },
      ],
    }
  },
  methods: {
    read(slug) {
      this.$router.push({ name: 'article-slug', params: { slug } })
    },
  },
}
</script>
