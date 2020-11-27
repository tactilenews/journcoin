import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'journcoin',
    paths: ['auth', 'wallet'],
  })(store)
}
