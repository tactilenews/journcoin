export const state = () => ({
  localTokens: [],
  remoteTokens: [],
})

export const getters = {
  nextCoin: (state) => state.localTokens[0],
  available: (state) => {
    return state.localTokens.filter(
      (token) => !state.remoteTokens.includes(token)
    ).length
  },
}

export const mutations = {
  add(state, jwt) {
    state.localTokens.push(jwt)
  },
  updateRemoteTokens(state, remoteTokens) {
    state.remoteTokens = remoteTokens
  },
}
