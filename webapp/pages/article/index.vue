<template>
  <PageWrapper title="Welchen Artikel möchtest du lesen?">
    <div class="flex flex-col items-center">
      <ArticlePreview
        v-for="article in articles"
        :key="article.slug"
        :article="article"
        @choose="choose"
      />
    </div>
    <Navigation :links="links" />
  </PageWrapper>
</template>

<script>
import ArticlePreview from '~/components/ArticlePreview/ArticlePreview.vue'
import { ARTICLE_PREVIEW } from '~/graphql/queries'

export default {
  components: {
    ArticlePreview,
  },
  apollo: {
    articles: ARTICLE_PREVIEW,
  },
  data() {
    return {
      links: [
        { to: '/', label: 'QR Code scannen' },
        { to: '/profile', label: 'Mein Profil' },
      ],
    }
  },
  methods: {
    choose(slug) {
      this.$router.push({ name: 'article-slug', params: { slug } })
    },
  },
}
</script>
