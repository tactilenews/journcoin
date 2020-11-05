<template>
  <div class="flex items-center px-5 space-x-3">
    <div class="flex-shrink-0">
      <img
        class="h-10 w-10 rounded-full"
        :src="require(`~/assets/images/users/${user.image}`)"
        :alt="user.name"
      />
    </div>
    <div class="space-y-1">
      <div class="text-base font-medium leading-none text-white">
        {{ user.name }}
      </div>
      <div class="text-sm font-medium leading-none text-gray-400">
        {{ user.email }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: { type: Object, required: true },
  },
}
</script>
