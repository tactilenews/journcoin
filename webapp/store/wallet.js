import { JOURNCOINS } from '~/graphql/queries'

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

export const actions = {
  async earn({ commit, state }, jwt) {
    if (state.localTokens.includes(jwt)) return null
    const client = this.app.apolloProvider.defaultClient
    const {
      data: { journCoins },
    } = await client.query({ query: JOURNCOINS })
    const alreadyTaken = journCoins.map((coin) => coin.token).includes(jwt)
    if (alreadyTaken) throw new Error('JournCoin taken')
    commit('add', jwt)
    return jwt
  },
}
