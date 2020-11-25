<template>
  <div>
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold leading-tight text-gray-900">
          {{ title }}
        </h1>
      </div>
    </header>
    <main>
      <div
        class="flex flex-col items-center max-w-7xl mx-auto py-6 sm:px-6 lg:px-8"
      >
        <slot></slot>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
  },
}
</script>
