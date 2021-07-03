<template>
  <div class="component-flex-page template-svg-demo">
    <Test></Test>
    <svg width="30" height="30" style="color: red">
      <use href="#more"></use>
    </svg>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import Test from './Test.vue'

export default {
  props: {},
  components: {
    Test,
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
