<template>
  <svg width="0" height="0">
    <defs>
      <!-- 1. 自己写 -->
      <symbol id="more" viewBox="0 0 100 100">
        <circle r="5" cx="20" cy="25" fill="currentColor" />
        <circle r="5" cx="20" cy="50" fill="currentColor" />
        <circle r="5" cx="20" cy="75" fill="currentColor" />
        <line x1="40" y1="25" x2="90" y2="25" stroke-width="8" stroke="currentColor"></line>
        <line x1="40" y1="50" x2="90" y2="50" stroke-width="8" stroke="currentColor"></line>
        <line x1="40" y1="75" x2="90" y2="75" stroke-width="8" stroke="currentColor"></line>
      </symbol>
      <symbol id="filledArrowRight" viewBox="0 0 100 100">
        <polyline points="20 10, 80 50, 20 90" fill="currentColor"></polyline>
      </symbol>
      <symbol id="arrowRight" viewBox="0 0 100 100">
        <polyline points="30 20, 70 50, 30 80" fill="transparent" stroke="currentColor" stroke-width="4"></polyline>
      </symbol>

      <!-- 2. 复制iconfont官网的svg代码 -->
      <!-- <svg t="1625237997579" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2430" width="48" height="48"><path d="M928 128v640h-306.752l-150.624 150.624-45.248-45.248 159.712-159.744 0.544-0.544 9.12-9.088H864V192H160v512h256v64H96V128h832z m-416 272a48 48 0 1 1 0 96 48 48 0 0 1 0-96z m-224 0a48 48 0 1 1 0 96 48 48 0 0 1 0-96z m448 0a48 48 0 1 1 0 96 48 48 0 0 1 0-96z" fill="#181818" p-id="2431"></path></svg> -->
      <!--
        1. 新建symbol标签，添加id
        2. 将svg的viewBox复制到symbol属性中
        3. 将path复制到symbol标签中
        4. 修改path上的fill为currentColor来继承父级颜色
      -->
      <symbol id="message" viewBox="0 0 1024 1024">
        <path fill="currentColor" d="M928 128v640h-306.752l-150.624 150.624-45.248-45.248 159.712-159.744 0.544-0.544 9.12-9.088H864V192H160v512h256v64H96V128h832z m-416 272a48 48 0 1 1 0 96 48 48 0 0 1 0-96z m-224 0a48 48 0 1 1 0 96 48 48 0 0 1 0-96z m448 0a48 48 0 1 1 0 96 48 48 0 0 1 0-96z" p-id="2431"></path>
      </symbol>
    </defs>
  </svg>
</template>

<script>
export default {
  props: {},
  components: {
  },
  setup (props, { emit }) {
  },
}
</script>

<style lang="scss">
</style>
