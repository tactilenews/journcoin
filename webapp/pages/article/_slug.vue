<template>
  <PageWrapper>
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
            <article class="prose prose-lg py-6">
              <h2>{{ data.read.title }}</h2>
              <p>{{ data.read.teaser }}</p>
              <VueQrcode
                :value="data.read.originalURL"
                :options="{ width: 200 }"
              ></VueQrcode>
              <!--eslint-disable-next-line vue/no-v-html -->
              <div v-html="$md.render(data.read.text.markdown)"></div>
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
  asyncData({ params }) {
    const { slug } = params
    const links = [{ to: '/article', label: 'Zurück zur Artikel-Übersicht' }]
    return { links, slug, READ }
  },
}
</script>
