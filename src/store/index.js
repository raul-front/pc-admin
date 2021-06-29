import { createStore } from 'vuex'
import lisaStore from 'lisa/store/lisa.js'

const modules = { lisa: lisaStore }
const allModules = import.meta.globEager('./modules/*.js')
Object.keys(allModules).forEach(path => {
  const fileName = path.replace(/(.*\/)*([^.]+).*/ig, '$2')
  modules[fileName] = allModules[path][fileName] || allModules[path].default || allModules[path]
})

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: modules,
})
