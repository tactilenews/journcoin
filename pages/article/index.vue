<template>
  <PageWrapper title="Artikel auswählen">
    <article class="prose py-6">
      <h1>Welchen Artikel möchtest du lesen?</h1>
      <ul>
        <li v-for="article in articles" :key="article.slug">
          <nuxt-link
            :to="{ name: 'article-slug', params: { slug: article.slug } }"
          >
            {{ article.slug }}
          </nuxt-link>
        </li>
      </ul>
    </article>
  </PageWrapper>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const articles = await $content('articles').fetch()
    return { articles }
  },
}
</script>
