<template>
  <PageWrapper title="Artikel auswählen">
    <article class="prose py-6">
      <h1>Welchen Artikel möchtest du lesen?</h1>
      <ArticlePreview
        v-for="article in articles"
        :key="article.slug"
        :article="article"
        @choose="choose"
      />
    </article>
  </PageWrapper>
</template>

<script>
import gql from 'graphql-tag'
import ArticlePreview from '@/components/ArticlePreview/ArticlePreview.vue'

const ARTICLE_PREVIEW = gql`
  query {
    articles(stage: DRAFT, locales: en) {
      id
      title
      slug
      teaser
      journCoins {
        id
        owner {
          name
        }
      }
    }
  }
`

export default {
  components: {
    ArticlePreview,
  },
  apollo: {
    articles: ARTICLE_PREVIEW,
  },
  methods: {
    choose(slug) {
      this.$router.push({ name: 'article-slug', params: { slug } })
    },
  },
}
</script>
