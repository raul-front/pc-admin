<template>
  <svg :style="{...style}" class="svgfont">
    <use :href="iconName"></use>
  </svg>
</template>

<script>
import { computed } from 'vue'
import './svg.js'

export default {
  props: {
    name: String,
    style: Object,
    prefix: {
      type: String,
      default: 'icon',
    },
  },
  components: {
  },
  setup (props, { emit }) {
    const iconName = computed(() => {
      return props.prefix ? `#${props.prefix}-${props.name}` : `#${props.name}`
    })
    return {
      iconName,
    }
  },
}
</script>

<style lang="scss">
// 需要自己添加，svg.js中自动创建的style中写的没有起作用
.svgfont {
  display: inline-block;
  width: 1em;
  height: 1em;
  fill: currentColor;
  vertical-align: -0.1em;
  font-size: 16px;
}
</style>
