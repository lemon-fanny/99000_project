import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {

  // LoginByUsername({ commit }, user) {
  //   return new Promise((resolve, reject) => {
  //     const data = { token: 'fake-token', role: user.role }
  //     // Cookies.set('Token', data.token) // 登录成功后将 token 存储在 cookie 中
  //     commit('SET_TOKEN', data.token)
  //     commit('SET_ROLES', [data.role])
  //     resolve()
  //   })
  // },
  //
  // GetInfo({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     const data = {
  //       roles: state.roles,
  //       name: state.roles[0] + ' User',
  //       avatar: 'https://example.com/avatar.png'
  //     }
  //     const { roles, name, avatar } = data
  //
  //     commit('SET_ROLES', roles)
  //     commit('SET_NAME', name)
  //     commit('SET_AVATAR', avatar)
  //     resolve({ data })
  //   })
  // },

  // user login
  async login({ commit }, userInfo) {
    const { zid, password } = userInfo
    try {
      console.log('Dispatching login request with data:', { zid, password }) // 添加日志输出
      const response = await login({ zid: zid.trim(), password: password })
      console.log('Login response:', response) // 添加日志输出
      commit('SET_TOKEN', response.token)
      setToken(response.token)
      return response
    } catch (error) {
      console.error('Login action error:', error) // 添加日志输出
      throw error
    }
  },

  async getInfo({ commit, state }) {
    try {
      console.log('Getting user info with token:', state.token) // 添加日志输出
      const response = await getInfo(state.token) // 传递 token 参数
      console.log('GetInfo response:', response) // 添加日志输出
      // 确保response存在且具有data和users属性
      if (!response || !response.data || !response.data.users || response.data.users.length === 0) {
        throw new Error('getInfo: user not found!')
      }
      // 假设返回的第一个用户就是我们需要的用户
      const user = response.data.users[0]
      console.log('Extracted user:', user) // 输出提取的用户信息
      commit('SET_NAME', user.username)
      commit('SET_AVATAR', '') // 假设 avatar 信息在返回的数据中缺失，设置为空字符串
      commit('SET_ROLES', [user.role])
      return user // 返回用户信息，而不是整个 response 对象
    } catch (error) {
      console.error('GetInfo action error:', error) // 添加日志输出
      throw error
    }
  },
  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
