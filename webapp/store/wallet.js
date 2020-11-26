export const state = () => ({
  localTokens: [],
})

export const getters = {
  nextCoin: (state) => state.localTokens[0],
  budget: (state) => state.localTokens.length,
}

export const mutations = {
  add(state, jwt) {
    state.localTokens.push(jwt)
  },
  pay(state, jwt) {
    state.localTokens = state.localTokens.filter((token) => token !== jwt)
  },
}
