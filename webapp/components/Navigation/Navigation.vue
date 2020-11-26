<template>
  <div class="flex flex-row py-10 justify-evenly">
    <nuxt-link
      v-for="link in links"
      :key="link.to"
      :to="link.to"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
    >
      {{ link.label }}
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    links: { type: Array, required: true },
  },
}
</script>
