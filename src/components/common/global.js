/*
 * @Descripttion: 注册全局组件
 * @Author: pujianguo
 * @Date: 2021-06-20 15:57:00
 */

// 不需要的组件，根据项目不同，也可设置需要的组件
const noLisas = []
export default {
  install (Vue) {
    const lisaComponents = import.meta.globEager('../../lisa/components/common/*.vue')
    Object.keys(lisaComponents).forEach(fileName => {
      const componentName = fileName.replace(/(.*\/)*([^.]+).*/ig, '$2')
      if (!noLisas.includes(componentName)) {
        const component = lisaComponents[fileName]
        Vue.component(componentName, component.default || component)
      }
    })

    const components = import.meta.globEager('./*.vue')
    Object.keys(components).forEach(fileName => {
      const component = components[fileName]
      const componentName = fileName.replace(/(.*\/)*([^.]+).*/ig, '$2')
      Vue.component(componentName, component.default || component)
    })
  },
}
