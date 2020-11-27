<template>
  <PageWrapper>
    <div class="flex flex-col items-center">
      <article class="prose prose-lg py-6">
        <h2>Dein JournCoin wurde gescannt!</h2>
        <div
          style="
            width: 100%;
            height: 0;
            padding-bottom: 56%;
            position: relative;
          "
        >
          <iframe
            src="https://giphy.com/embed/JpG2A9P3dPHXaTYrwu"
            width="100%"
            height="100%"
            style="position: absolute"
            frameBorder="0"
            class="giphy-embed"
            allowFullScreen
          ></iframe>
        </div>
        <p class="text-xs text-right">
          <a href="https://giphy.com/gifs/money-make-it-rain-JpG2A9P3dPHXaTYrwu"
            >via GIPHY</a
          >
        </p>
        <section>
          <h2>Was möchtest du jetzt tun?</h2>
          <p>
            Bislang hast du <strong>{{ budget }} JournCoins</strong> gescannt.
          </p>
        </section>
      </article>
    </div>
    <template #footer>
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
