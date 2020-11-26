<template>
  <div v-show="isOpen" class="md:hidden">
    <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
      <nuxt-link
        v-for="link in topNavLinks"
        :key="link.name"
        :to="link.to"
        class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
      >
        {{ link.name }}
      </nuxt-link>
    </div>
    <div class="pt-4 pb-3 border-t border-gray-700">
      <User :user="user" />
      <div class="mt-3 px-2 space-y-1">
        <nuxt-link
          v-for="link in profileDropdownLinks"
          :key="link.name"
          :to="link.to"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
          >{{ link.name }}</nuxt-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import User from '~/components/User/User.vue'
import { links as topNavLinks } from '~/components/TopNav/TopNav.vue'
import { links as profileDropdownLinks } from '~/components/ProfileDropdown/ProfileDropdown.vue'

export default {
  components: {
    User,
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      topNavLinks,
      profileDropdownLinks,
    }
  },
}
</script>
