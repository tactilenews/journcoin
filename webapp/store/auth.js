import { PROFILE } from '~/graphql/queries'
import { REDEEM } from '~/graphql/mutations'

export const state = () => ({
  profile: null,
  loading: false,
})

export const getters = {
  profile: (state) => state.profile,
  budget: (state) => {
    return state.profile.journCoins.filter((coin) => !coin.article).length
  },
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
  async earn({ commit, state }, jwt) {
    commit('setLoading', true)
    try {
      const client = this.app.apolloProvider.defaultClient
      const {
        data: {
          redeem: { token, owner },
        },
      } = await client.mutate({ mutation: REDEEM, variables: { token: jwt } })
      commit('setProfile', owner)
      return token
    } catch (e) {
      const { graphQLErrors } = e
      if (
        graphQLErrors.some(
          ({ message }) =>
            message === 'value is not unique for the field "token"'
        )
      )
        return null
      throw new Error(e)
    } finally {
      commit('setLoading', false)
    }
  },
}
