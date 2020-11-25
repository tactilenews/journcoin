<template>
  <div class="h-64 w-64 bg-red-600">
    <client-only>
      <qrcode-stream class="m-auto" @decode="onDecode"></qrcode-stream>
    </client-only>
  </div>
</template>

<script>
export const validJournCoin = (decodedString) => {
  try {
    const url = new URL(decodedString)
    if (url.hostname !== 'app.journcoin.de') return null
    return url.searchParams.get('jwt')
  } catch (e) {
    return null
  }
}

export default {
  methods: {
    onDecode(decodedString) {
      const decoded = validJournCoin(decodedString)
      if (!decoded) return false
      this.$emit('parse', decoded)
    },
  },
}
</script>
