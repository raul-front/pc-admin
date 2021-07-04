<template>
  <div class="r-loading">
    <svg :width="width" :height="hieght" viewBox="0 0 50 50">
      <!--
        stroke-dasharry = 2*pi*r / 4 = 2*22*3.1415926/4=34
      -->
      <circle cx="25" cy="25" r="22" fill="none" stroke-width="3" :stroke="outsideColor"
        stroke-dasharray="34"
        stroke-linecap="round"
      >
        <!--
          type="rotate"时from、to的值
          角度 旋转中心x坐标 旋转中心y坐标
          可以使用values代替 form 和 to
          values="0 25 25; 360 25 25"
        -->
        <animateTransform
          attributeName="transform" attributeType="XML" type="rotate"
          from="0 25 25" to="360 25 25"
          :dur="`${druration}s`" repeatCount="indefinite"
        />
        <animate
          attributeName="stroke"
          :values="outsideColorAnimation"
          :dur="`${+druration * 2}s`" repeatCount="indefinite"
        />
      </circle>
      <circle cx="25" cy="25" r="12" fill="none" stroke-width="3" :stroke="insideColor"
        stroke-dasharray="19"
        stroke-linecap="round"
      >
        <animateTransform
          attributeName="transform" attributeType="XML" type="rotate"
          values="360 25 25; 0 25 25"
          :dur="`${druration}s`" repeatCount="indefinite"
        />
        <animate
          attributeName="stroke"
          :values="insideColorAnimation"
          :dur="`${+druration * 2}s`" repeatCount="indefinite"
        />
      </circle>
    </svg>
    <div class="r-loading-cont">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
export default {
  props: {
    width: {
      type: [Number, String],
      default: 50,
    },
    hieght: {
      type: [Number, String],
      default: 50,
    },
    outsideColor: {
      type: String,
      default: '#3be6cb',
    },
    insideColor: {
      type: String,
      default: '#02bcfe',
    },
    druration: {
      type: [Number, String],
      default: 2,
    },
  },
  setup (props) {
    const outsideColorAnimation = computed(() => {
      return `${props.outsideColor};${props.insideColor};${props.outsideColor}`
    })
    const insideColorAnimation = computed(() => {
      return `${props.insideColor};${props.outsideColor};${props.insideColor}`
    })
    return {
      outsideColorAnimation,
      insideColorAnimation,
    }
  },
}
</script>
