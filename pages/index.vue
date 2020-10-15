<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline"> Welcome to JournCoin </v-card-title>
        <v-card-text>
          <p>Journcoin is a new digital currency for journalism.</p>
        </v-card-text>
        <qrcode-stream @decode="onDecode"></qrcode-stream>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" nuxt to="#"> Continue </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  methods: {
    onDecode(decodedString: string) {
      console.log('decodedString', decodedString)
    },
  },
})
</script>
