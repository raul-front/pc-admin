const state = {
  departmentTree: [],
}

export const resource = {
  namespaced: true,
  state,
  actions: {
  },
  mutations: {
    SET_DEPARTMENT_TREE (state, payload) {
      state.departmentTree = payload
    },
  },
}
