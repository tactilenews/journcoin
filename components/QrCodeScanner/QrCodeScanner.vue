<template>
  <div class="h-64 w-64 bg-red-600">
    <client-only>
      <!--<qrcode-stream class="m-auto" @decode="onDecode"></qrcode-stream>-->
    </client-only>
  </div>
</template>

<script>
export default {
  methods: {
    onDecode(decodedString) {
      console.log('decodedString', decodedString)
    },
  },
}
</script>
