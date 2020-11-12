<template>
  <PageWrapper title="Artikel lesen">
    <article class="prose py-6">
      <h1>{{ article.title }}</h1>
      <p>{{ article.teaser }}</p>
      <VueQrcode :value="link" :options="{ width: 200 }"></VueQrcode>
      <nuxt-content :document="article" />
    </article>
  </PageWrapper>
</template>

<script>
import VueQrcode from '@chenfengyuan/vue-qrcode';

export default {
  components: {
    VueQrcode
  },
  async asyncData({ $content, params, $config }) {
    const { slug } = params
    const [article] = await $content('articles').where({ slug }).fetch()
    const link = `${$config.baseURL}/article/${slug}`
    return { article, link }
  },
}
</script>
