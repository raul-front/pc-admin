import storage from '@/utils/storage'
import config from '@/config'

const state = {
  fullLoading: false,
  permission: null,
  userInfo: {
    id: 0,
    isAdmin: false,
    name: 'raul',
    phone: '',
    email: '',
    avatar: config.defaultAvatar,
  },
}

export const user = {
  namespaced: true,
  state,
  actions: {
    syncSystemInitDataFromApi ({ commit }) {
      const apis = []
      commit('SET_FULL_LOADING', true)
      Promise.all(apis).then(() => {
        // 设置菜单
        // commit('setInitMenuFromApi', menu)
        // // 设置公共资源， mutations在common模块中
        // commit('setInitConstDataFromApi', [org, permission])
        // // 设置app公共资源， app/store.appCommon模块中
        // commit('appCommon/setInitAppConstDataFromApi', res)
      }).finally(() => {
        setTimeout(() => {
          commit('SET_FULL_LOADING', false)
        }, 350)
      })
    },
    syncSystemInitDataFromStorage ({ commit }) {
      const token = storage.getToken()
      const pageOption = storage.getPageOption()
      const menuCollapsed = storage.getMenuCollapsed()
      commit('lisa/SET_INITDATA_FROM_STORAGE', {
        token,
        pageOption,
        menuCollapsed,
      }, { root: true })

      // 初始化本项目中的数据
      commit('SET_INITDATA_FROM_STORAGE')
    },
  },
  mutations: {
    SET_FULL_LOADING (state, payload) {
      state.fullLoading = payload
    },

    // 初始化数据
    SET_INITDATA_FROM_STORAGE (state) {
      // console.log('SET_INITDATA_FROM_STORAGE')
      // const userInfo = storage.setAdminInfo()
      // if (userInfo) {
      //   state.userInfo = userInfo
      // }
    },
    SET_SYSTEM_INITDATA_FROM_API (state, data) {
      console.log('SET_SYSTEM_INITDATA_FROM_API')
    },
  },
}
