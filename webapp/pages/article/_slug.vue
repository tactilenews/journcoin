<template>
  <PageWrapper title="Artikel lesen">
    <Icon
      v-if="$apollo.queries.read.loading"
      class="h-10 w-10 animate-spin"
      name="spinner"
    />
    <article v-else class="prose py-6">
      <h1>{{ read.title }}</h1>
      <p>{{ read.teaser }}</p>
      <VueQrcode :value="link" :options="{ width: 200 }"></VueQrcode>
      <nuxt-content :document="read" />
    </article>
    <Navigation :links="links" />
  </PageWrapper>
</template>

<script>
import VueQrcode from '@chenfengyuan/vue-qrcode'
import { READ } from '~/graphql/queries'
import Navigation from '~/components/Navigation/Navigation.vue'

export default {
  components: { Navigation, VueQrcode },
  apollo: {
    read: {
      query: READ,
      variables() {
        const { slug } = this.$route.params
        return { slug }
      },
    },
  },
  asyncData({ params, $config }) {
    const { slug } = params
    const link = `${$config.URL}/article/${slug}`
    return { link }
  },
  data() {
    return {
      links: [{ to: '/article', label: 'Zurück zur Artikel-Übersicht' }],
    }
  },
}
</script>
