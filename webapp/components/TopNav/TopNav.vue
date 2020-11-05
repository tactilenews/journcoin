<template>
  <!--
    Tailwind UI components require Tailwind CSS v1.8 and the @tailwindcss/ui plugin.
    Read the documentation to get started: https://tailwindui.com/documentation
  -->
  <div>
    <nav class="bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <nuxt-link to="/" class="flex-shrink-0">
              <img
                class="h-8 w-8"
                src="~/assets/images/logo.png"
                alt="JournCoin logo"
              />
            </nuxt-link>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <nuxt-link
                  v-for="link in links"
                  :key="link.name"
                  :to="link.to"
                  class="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                >
                  {{ link.name }}
                </nuxt-link>
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <button
                class="p-1 border-2 border-transparent text-yellow-600 rounded-full hover:text-yellow-500 focus:outline-none focus:text-yellow-500 focus:bg-gray-700 flex items-center"
                aria-label="Notifications"
              >
                <Icon name="journcoin" />
                <span class="text-xl">{{ coins.length }}</span>
              </button>

              <!-- Profile dropdown -->
              <ProfileDropdown :user="user" />
            </div>
          </div>
          <div class="-mr-2 flex md:hidden">
            <!-- Mobile menu button -->
            <button
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
              @click="isOpen = !isOpen"
            >
              <Icon name="menu" />
            </button>
          </div>
        </div>
      </div>
      <MobileMenu :is-open="isOpen" :user="user" />
    </nav>
  </div>
</template>

<script>
import ProfileDropdown from '~/components/ProfileDropdown/ProfileDropdown.vue'
import MobileMenu from '~/components/MobileMenu/MobileMenu.vue'
import Icon from '~/components/Icon/Icon.vue'

export const links = [
  { name: 'QR code scannen', to: '/' },
  { name: 'Artikel wählen', to: '/article' },
]

export default {
  components: {
    ProfileDropdown,
    MobileMenu,
    Icon,
  },
  data: () => ({
    coins: [null, null, null, null],
    links,
    isOpen: false,
    user: {
      name: 'Till Prochaska',
      email: 'till@example.org',
      image: 'till.jpg',
    },
  }),
}
</script>
