<template>
  <section class="prose prose-lg pt-6 pb-8">
    <h3>{{ article.title }}</h3>
    <button
      v-if="article.bought"
      class="float-right bg-blue-500 hover:bg-blue-700 text-white font-bold ml-4 py-2 px-4 rounded-full"
      @click="$emit('read', article.slug)"
    >
      Jetzt lesen
    </button>
    <button
      v-else-if="budget <= 0"
      disabled
      class="float-right bg-gray-500 hover:bg-gray-400 text-gray font-bold ml-4 py-2 px-4 rounded-full"
    >
      Kein Budget
    </button>
    <ApolloMutation
      v-else
      :mutation="BUY"
      :variables="variables"
      @done="handlePayment"
    >
      <template #default="{ mutate, loading, error }">
        <button
          :disabled="loading"
          class="float-right bg-purple-500 hover:bg-purple-700 text-white font-bold ml-4 py-2 px-4 rounded-full"
          @click="mutate()"
        >
          Artikel kaufen
        </button>
        <p v-if="error">An error occurred: {{ error }}</p>
      </template>
    </ApolloMutation>
    <p class="text-gray-600">
      {{ article.teaser }}
    </p>
  </section>
</template>

<script>
import { ApolloMutation } from 'vue-apollo'
import { mapGetters, mapMutations } from 'vuex'
import { BUY } from '~/graphql/mutations'
export default {
  components: { ApolloMutation },
  props: {
    article: { type: Object, required: true },
  },
  data() {
    return { BUY }
  },
  computed: {
    ...mapGetters({
      budget: 'auth/budget',
    }),
    variables() {
      return { slug: this.article.slug }
    },
  },
  methods: {
    ...mapMutations({
      setProfile: 'auth/setProfile',
    }),
    handlePayment({ data }) {
      const {
        buy: { owner, article },
      } = data
      this.setProfile(owner)
      this.$emit('read', article.slug)
    },
  },
}
</script>
