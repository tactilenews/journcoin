<template>
  <PageWrapper title="Artikel lesen">
    <ApolloQuery
      :query="READ"
      :variables="{ slug }"
      notify-on-network-status-change
    >
      <template #default="{ result: { loading, error, data } }">
        <div class="flex flex-col items-center">
          <Spinner v-if="loading" />
          <div v-if="error" class="error apollo">An error occurred</div>
          <template v-else-if="data">
            <article class="prose py-6">
              <h1>{{ data.read.title }}</h1>
              <p>{{ data.read.teaser }}</p>
              <VueQrcode
                :value="articleLink"
                :options="{ width: 200 }"
              ></VueQrcode>
              <nuxt-content :document="data.read" />
            </article>
          </template>
        </div>
      </template>
    </ApolloQuery>
    <template #footer>
      <Navigation :links="links" />
    </template>
  </PageWrapper>
</template>

<script>
import VueQrcode from '@chenfengyuan/vue-qrcode'
import { ApolloQuery } from 'vue-apollo'
import { READ } from '~/graphql/queries'
import Navigation from '~/components/Navigation/Navigation.vue'
import Spinner from '~/components/Spinner/Spinner.vue'

export default {
  components: { ApolloQuery, Spinner, Navigation, VueQrcode },
  asyncData({ params, $config }) {
    const { slug } = params
    const articleLink = `${$config.URL}/article/${slug}`
    const links = [{ to: '/article', label: 'Zurück zur Artikel-Übersicht' }]
    return { articleLink, links, slug, READ }
  },
}
</script>
