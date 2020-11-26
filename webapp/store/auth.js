export const state = () => ({
  isAuthenticated: false,
})

export const getters = {
  isAuthenticated: (state) => state.isAuthenticated,
}

export const mutations = {
  setAuthenticated(state, isAuthenticated) {
    state.isAuthenticated = isAuthenticated
  },
}

export const actions = {
  nuxtServerInit({ commit }, context) {
    console.log('nuxtServerInit')
    commit('setAuthenticated', context.app.$apolloHelpers.getToken())
  },
}
