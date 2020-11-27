import { PROFILE } from '~/graphql/queries'

export const state = () => ({
  profile: null,
  token: null,
})

export const getters = {
  profile: (state) => state.profile,
  token: (state) => state.token,
}

export const mutations = {
  setProfile(state, profile) {
    state.profile = profile
  },
  setJwt(state, jwt) {
    state.jwt = jwt
  },
}

export const actions = {
  async login({ commit }, jwt) {
    await this.$apolloHelpers.onLogin(jwt)
    const client = this.app.apolloProvider.defaultClient
    const {
      data: { profile },
    } = await client.query({ query: PROFILE })
    commit('setJwt', jwt)
    commit('setProfile', profile)
  },
}
