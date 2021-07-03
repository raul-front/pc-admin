<template>
  <div class="component-flex-full">
    <tabs :list="tabList"></tabs>
    <router-view></router-view>
  </div>
</template>

<script>
import { ref } from 'vue'
import Tabs from 'lisa/components/other/RTabsForRoute.vue'

export default {
  components: { Tabs },
  setup () {
    const tabList = ref([
      { label: '基础', value: 'base', pageName: 'Template_Svg' },
      { label: '示例', value: 'demo', pageName: 'Template_Svg_Demo' },
    ])
    return {
      tabList,
    }
  },

}
</script>
