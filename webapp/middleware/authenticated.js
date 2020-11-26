export default ({ app, route, redirect }) => {
  if (['index'].includes(route.name)) return false
  const hasToken = !!app.$apolloHelpers.getToken()
  if (!hasToken) return redirect('/')
}
