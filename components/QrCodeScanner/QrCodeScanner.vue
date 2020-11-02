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
    if (url.hostname !== 'journcoin.org' || !url.pathname.startsWith('/coin'))
      return false
    const [, , ...tail] = url.pathname.split('/')
    return tail.join('/')
  } catch (e) {
    return false
  }
}

export default {
  methods: {
    onDecode(decodedString) {
      const coin = validJournCoin(decodedString)
      if (!coin) return false
      this.$emit('earn', coin)
    },
  },
}
</script>
