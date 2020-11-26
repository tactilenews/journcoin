<template>
  <section class="prose pt-6 pb-8">
    <h2>{{ article.title }}</h2>
    <button
      class="float-right bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      @click="choose(article.slug)"
    >
      Kaufen
    </button>
    <p class="text-gray-600">
      {{ article.teaser }}
    </p>
  </section>
</template>

<script>
export default {
  props: {
    article: { type: Object, required: true },
  },
  methods: {
    choose(slug) {
      this.$emit('choose', slug)
    },
  },
}
</script>
