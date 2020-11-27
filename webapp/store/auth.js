import { PROFILE } from '~/graphql/queries'

export const state = () => ({
  profile: null,
  token: null,
  loading: false,
})

export const getters = {
  profile: (state) => state.profile,
  token: (state) => state.token,
  loading: (state) => state.loading,
}

export const mutations = {
  setProfile(state, profile) {
    state.profile = profile
  },
  setJwt(state, jwt) {
    state.jwt = jwt
  },
  setLoading(state, loading) {
    state.loading = loading
  },
}

export const actions = {
  async login({ commit }, jwt) {
    commit('setLoading', true)
    try {
      await this.$apolloHelpers.onLogin(jwt)
      const client = this.app.apolloProvider.defaultClient
      const {
        data: { profile },
      } = await client.query({ query: PROFILE })
      commit('setJwt', jwt)
      commit('setProfile', profile)
    } finally {
      commit('setLoading', false)
    }
  },
}
