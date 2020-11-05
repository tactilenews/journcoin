<template>
  <PageWrapper title="Artikel lesen">
    <article class="prose py-6">
      <h1>{{ article.title }}</h1>
      <nuxt-content :document="article" />
    </article>
  </PageWrapper>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const { slug } = params
    const [article] = await $content('articles').where({ slug }).fetch()
    return { article }
  },
}
</script>
