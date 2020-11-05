<template>
  <component :is="`${name}-icon`" class="h-6 w-6">
    <!-- component changes when vm.currentView changes! -->
  </component>
</template>

<script>
import bell from '~/assets/icons/bell.svg?inline'
import menu from '~/assets/icons/menu.svg?inline'
import journcoin from '~/assets/icons/journcoin.svg?inline'

export default {
  components: {
    'bell-icon': bell,
    'menu-icon': menu,
    'journcoin-icon': journcoin,
  },
  props: {
    name: { type: String, required: true },
  },
}
</script>
