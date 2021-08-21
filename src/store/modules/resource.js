import { listDepartment } from 'api/account'
import { filter, format } from 'lisa/utils/func'

const state = {
  department: [],
  departmentTree: [],
}

export const resource = {
  namespaced: true,
  state,
  actions: {
    syncDepartment ({ commit }) {
      return listDepartment().then(res => {
        commit('SET_DEPARTMENT', res.items || [])
      })
    },
  },
  mutations: {
    SET_DEPARTMENT (state, payload) {
      const list = payload.map(x => {
        return {
          id: x._id,
          name: x.name,
          sort: x.sort,
          parentId: x.parentId || 0,
          status: x.status,
          statusLabel: filter('useStopStatus', x.status),
          remark: x.remark,
          createdAt: format('second', x.createdAt),
          updatedAt: format('second', x.updatedAt),
        }
      })
      let tree = payload.map(x => {
        return {
          parentId: x.parentId || 0,
          value: x._id,
          label: x.name,
        }
      })
      state.department = unlimitedForLayer(list)
      tree = unlimitedForLayer(tree, 0, 'value')
      console.log('tree', tree)
      state.departmentTree = tree
    },
  },
}

const unlimitedForLayer = (cate, pid = 0, k = 'id') => {
  const arr = []
  cate.forEach(x => {
    if (x.parentId === pid) {
      x.children = unlimitedForLayer(cate, x[k], k)
      delete x.parentId
      arr.push(x)
    }
  })
  return arr
}
