<template>
  <div class="component-flex-page template-svg-base">
    <!-- 引入资源 -->
    <Test></Test>
    <svg prefix="" width="30" height="30" style="color: red;">
      <use href="#more"></use>
    </svg>
    <svg prefix="" width="30" height="30" style="color: green;">
      <use href="#filledArrowRight"></use>
    </svg>
    <svg prefix="" width="30" height="30" style="color: green;">
      <use href="#arrowRight"></use>
    </svg>

    <!-- 封装组件 -->
    <Icon prefix="" name="arrowRight" :style="{'font-size': '50px', color: 'red'}"></Icon>
    <Icon prefix="" name="message" :style="{'font-size': '50px', color: 'red'}"></Icon>

    <!-- 引入iconfont中的icon -->
    <!-- 1. 在index.html直接导入远程仓库中的js -->
    <!-- 2. 复制远程仓库中的js，保存在本地文件中 -->
    <Icon name="left" :style="{color: 'red', 'font-size': '20px'}"></Icon>

    <!-- svg-animation -->
    <svg-animation></svg-animation>

  </div>
</template>

<script>
import { onMounted } from 'vue'
import Test from './Test.vue'
import Icon from './Icon.vue'
import SvgAnimation from './SvgAnimation/SvgAnimation.vue'

export default {
  props: {},
  components: {
    Test,
    Icon,
    SvgAnimation,
  },
  setup (props, { emit }) {
    onMounted(() => {
    })

    return {
    }
  },
}
</script>

<style lang="scss">
</style>
