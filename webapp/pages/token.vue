<template>
  <PageWrapper>
    <div class="flex flex-col items-center">
      <article class="prose prose-lg py-6">
        <h2>Dein JournCoin wurde gescanned!</h2>

        <p>Bislang hast du {{ budget }} JournCoins gescanned.</p>
      </article>
    </div>

    <template #footer>
      <div class="flex flex-col items-center">
        <div class="prose prose-lg py-6">
          <h2>Was möchtest du jetzt tun?</h2>
        </div>
      </div>
      <Navigation :links="links" />
    </template>
  </PageWrapper>
</template>

<script>
import { mapGetters } from 'vuex'
import PageWrapper from '~/components/PageWrapper/PageWrapper.vue'
import Navigation from '~/components/Navigation/Navigation.vue'

export default {
  components: { PageWrapper, Navigation },
  data() {
    return {
      links: [
        { to: '/', label: 'Weiterscannen' },
        { to: '/article', label: 'Arikel auswählen' },
      ],
    }
  },
  computed: {
    ...mapGetters({
      budget: 'wallet/budget',
    }),
  },
}
</script>
