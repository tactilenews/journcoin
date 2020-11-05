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
import ArticlePreview from '@/components/ArticlePreview/ArticlePreview.vue'

export default {
  components: {
    ArticlePreview,
  },
  async asyncData({ $content }) {
    const articles = await $content('articles').fetch()
    return { articles }
  },
  methods: {
    choose(slug) {
      this.$router.push({ name: 'article-slug', params: { slug } })
    },
  },
}
</script>
