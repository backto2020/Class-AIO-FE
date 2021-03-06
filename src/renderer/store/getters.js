const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  sid: state => state.user.sid,
  username: state => state.user.username,
  admin: state => state.user.admin
};
export default getters;
