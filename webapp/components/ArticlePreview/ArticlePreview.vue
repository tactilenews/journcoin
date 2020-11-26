<template>
  <section class="prose pt-6 pb-8">
    <h2>{{ article.title }}</h2>
    <button
      v-if="alreadyBought(article)"
      class="float-right bg-blue-500 hover:bg-blue-700 text-white font-bold ml-4 py-2 px-4 rounded-full"
      @click="$emit('read', article.slug)"
    >
      Kostenlos lesen
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
          class="float-right bg-blue-500 hover:bg-blue-700 text-white font-bold ml-4 py-2 px-4 rounded-full"
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
    currentUserId: { type: String, required: true },
  },
  data() {
    return { BUY }
  },
  computed: {
    ...mapGetters({
      budget: 'wallet/budget',
      nextCoin: 'wallet/nextCoin',
    }),
    variables() {
      return { id: this.article.id, token: this.nextCoin }
    },
  },
  methods: {
    ...mapMutations({
      pay: 'wallet/pay',
    }),
    alreadyBought(article) {
      const buyerIds = article.journCoins.map((coin) => coin.owner.id)
      return buyerIds.includes(this.currentUserId)
    },
    handlePayment({ data }) {
      const {
        buy: { token },
      } = data
      this.pay(token)
      this.$emit('read', this.article.slug)
    },
  },
}
</script>
