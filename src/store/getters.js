const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  applicationId: state => state.application.applicationId,
  applicationInfo: state => state.application.applicationInfo,
}
export default getters
