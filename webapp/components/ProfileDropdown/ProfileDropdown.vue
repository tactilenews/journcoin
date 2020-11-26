<template>
  <div class="ml-3 relative">
    <div>
      <button
        id="user-menu"
        class="p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-white focus:outline-none focus:text-white focus:bg-gray-700"
        aria-label="User menu"
        aria-haspopup="true"
        @click="isOpen = !isOpen"
      >
        <img
          class="h-8 w-8 rounded-full"
          :src="require(`~/assets/images/users/${user.image}`)"
          alt="user.name"
        />
      </button>
    </div>

    <transition
      enter-active-class="transition ease-out duration-100 transform"
      enter-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75 transform"
      leave-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-show="isOpen"
        class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg"
      >
        <div
          class="py-1 rounded-md bg-white shadow-xs"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu"
        >
          <nuxt-link
            v-for="link in links"
            :key="link.name"
            :to="link.to"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem"
          >
            {{ link.name }}
          </nuxt-link>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export const links = [
  { name: 'Your Profile', to: '/profile' },
  { name: 'Settings', to: '#' },
  { name: 'Sign out', to: '#' },
]

export default {
  props: {
    user: { type: Object, required: true },
  },
  data() {
    return { links, isOpen: false }
  },
}
</script>
