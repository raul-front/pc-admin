<template>
  <div class="component-flex-page template-svg-demo">
    Loading
    <Loading width="50" hieght="50">加载中...</Loading>

    <br>
    <br>
    <br>
    <br>
    <br>

    FlyBox
    <fly-box style="width: 300px; height: 200px; background: #333;">
      xxx
    </fly-box>
    <fly-box style="width: 500px; height: 300px; background: #333;">
      xxx
    </fly-box>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import Loading from './components/Loading.vue'
import FlyBox from './components/FlyBox.vue'

export default {
  props: {},
  components: {
    Loading,
    FlyBox,
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
