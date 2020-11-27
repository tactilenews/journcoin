export default ({ store, route, redirect }) => {
  if (['index'].includes(route.name)) return false
  const { profile } = store.state.auth
  if (!profile) return redirect('/')
}
