<template>
    <!-- transform 变换 -->

  <div class="container">
    <svg class="svg" width="500" height="200" viewBox="0 0 500 200">
      <rect x="0" y="0" width="100" height="50" fill="red" transform="translate(10, 10) rotate(30) skewX(20) scale(2)"></rect>

    </svg>
  </div>

  <!-- stroke-dasharray -->
  <div class="container">
    <svg class="svg" width="500" height="200" viewBox="0 0 500 200">
      <rect class="rect-stroke-dasharray" x="10" y="10" width="100" height="50" fill="red"
        stroke="blue"
        stroke-width="5"
      ></rect>
    </svg>
  </div>

  <!-- 复杂变形 matrix -->
  <div class="container">
    <svg class="svg" width="500" height="200" viewBox="0 0 500 200">
      <!-- 周长: 2*3.1415926 * 180 = 1131 -->
      <rect x="0" y="0" width="100" height="50" fill="red" transform="matrix(2 1 -1 2 50 0)"></rect>

    </svg>
    <!-- matrix(2 1 -1 2 50 0) -->
    <!--
      6个参数 拆分成2组，1、3、5一组；2，4，6一组
      [2, -1, 50]   => 2*_x + (-1)*_y + 50 = X   => a * _x + c * _y + e = X
      [1, 2, 0]     => 1*_x + 2*_y + 0 = Y       => b * _x + d * _y +f = Y

      顶点坐标,通过上面的方法计算
      [0, 0]      =>  [50, 0]
      [100, 0]    =>  [250, 100]
      [100, 50]   =>  [200, 200]
      [0, 50]     =>  [0, 100]
    -->
  </div>

  <!-- svg动画 -->
  <!-- 1. 环形进度条
  -->
  <div class="container">
    <svg class="svg" width="440" height="440" viewBox="0 0 440 440">
      <circle cx="220" cy="220" r="200" stroke-width="20" stroke="#d1d3d7" fill="none"></circle>
      <!-- 周长：2 * 3.1415926 * 200 = 1257 -->
      <!-- 默认从最右侧开始转，变换transform，使起点在最上面
        计算方法查看 当前文件夹下的 a.png
      -->
      <circle class="circle" cx="220" cy="220" r="200" stroke-width="20" stroke="#00a5e0" fill="none"
        transform="matrix(0 -1 1 0 0 440)" type="attribute"

      ></circle>
    </svg>
  </div>

  <!-- 矩形 -->
  <div class="container">
    <svg class="svg" width="200" height="200" viewBox="0 0 200 200">
      <rect x="0" y="0" r="200" width="200" height="200" fill="none" stroke-width="8" stroke="#d1d3d7"></rect>
      <rect x="0" y="0" r="200" width="200" height="200" fill="none" stroke-width="8" stroke="#00a5e0"
        class="rect"
      ></rect>
    </svg>
  </div>

  <div class="container">
    <svg class="line-svg" width="400" height="400" viewBox="0 0 400 400">
      <line class="line-stroke" x1="0" y1="10" x2="400" y2="10" fill="none" stroke-width="20" stroke="red"></line>
    </svg>
  </div>

  <!-- logo描边
    知识点：
    stroke-dasharray
    stroke-dashoffset
  -->
  <div class="container">
    <svg width="200" height="200" viewBox="0 0 1024 1024">
      <path ref="logoRef" class="logo" d="M786.731708 648C807.42218 648 824.195121 603.109084 824.195121 547.733333 824.195121 492.357583 807.42218 447.466667 786.731708 447.466667 766.041235 447.466667 749.268292 492.357583 749.268292 547.733333 749.268292 603.109084 766.041235 648 786.731708 648ZM462.048781 698.133333C482.739253 698.133333 499.512194 658.853781 499.512194 610.4 499.512194 561.946217 482.739253 522.666667 462.048781 522.666667 441.358308 522.666667 424.585365 561.946217 424.585365 610.4 424.585365 658.853781 441.358308 698.133333 462.048781 698.133333ZM0 572.8C0 822.813926 229.933961 1024 512 1024 794.066039 1024 1024 822.813926 1024 572.8 1024 322.786074 794.066039 121.599999 512 121.599999 515.649685 121.599999 516.946722 122.183253 516.866057 122.124053 514.736119 120.560928 512.302005 118.428984 505.789668 112.472612 487.675081 95.904489 476.340222 86.603485 458.812092 75.393661 404.94781 40.945655 334.29571 21.333333 237.268292 21.333333 223.474645 21.333333 212.292683 32.556062 212.292683 46.4 212.292683 60.243938 223.474645 71.466667 237.268292 71.466667 325.013274 71.466667 386.336418 88.489363 431.969129 117.673005 444.078925 125.417623 494.717728 171.733333 512 171.733333 767.886246 171.733333 974.048781 352.120043 974.048781 572.8 974.048781 793.479955 767.886246 973.866667 512 973.866667 256.113754 973.866667 49.951219 793.479955 49.951219 572.8 49.951219 427.029845 140.536466 294.462295 284.745583 223.557118 297.132651 217.466607 302.254953 202.450961 296.186566 190.018733 290.11818 177.586505 275.157079 172.445527 262.770012 178.536038 102.138268 257.515945 0 406.990833 0 572.8Z" p-id="3364"></path>
    </svg>
  </div>

  <!--
    svg动画 SMIL
    允许我们通过HTML标签实现动画效果，它可以用于：
    * 实现过渡动画
    * 实现补间动画
    * 动画颜色变换
    * 路径运动动画（css3无法实现）
    SMIL 包含以下标签：
      <set>
      <animate>
      <animateColor> 已废弃
      <animateTransform>
      <animateMotion>
  -->
  <div class="container">
    <svg width="200" height="200">
      <rect x="0" y="0" fill="red" width="100" height="50">
        <set attributeName="x" attributeType="XML" to="10" begin="1s"></set>
        <set attributeName="x" attributeType="XML" to="20" begin="2s"></set>
        <set attributeName="fill" attributeType="XML" to="blue" begin="3s"></set>
      </rect>
    </svg>
  </div>

  animate
  <div class="container">
    <svg width="200" height="200">
      <circle cx="0" cy="0" r="30" fill="blue" stroke="black" stroke-width="1">
        <!--
          fill="freeze"  动画结束后保留在最后状态
          fill="remove"  动画结束后回归原位（默认）
          repeatCount="indefinite" 无限循环
        -->
        <animate attributeName="cx" attributeType="XML" from="0" to="100" dur="1s" repeatCount="2" fill="freeze"></animate>
        <animate attributeName="cy" attributeType="XML" from="0" to="100" dur="1s" repeatCount="2" fill="freeze"></animate>
        <animate attributeName="fill" attributeType="XML" from="blue" to="red" dur="1s" repeatCount="2" fill="freeze"></animate>
      </circle>
    </svg>
  </div>
  <div class="container">
    <svg width="400" height="400">
      <polygon points="30 30 70 30 90 70 10 70" fill="#fcc" storke="black" stroke-width="1">
        <animate attributeName="points" attributeType="XML" to="50 30 70 50 50 90 30 50" dur="3s" fill="freeze" repeatCount="2"></animate>
      </polygon>
    </svg>
  </div>

  animateTransform
  <div class="container">
    <svg width="200" height="200">
      <circle cx="0" cy="0" r="30" fill="blue" stroke="black" stroke-width="1">
        <animateTransform attributeName="transform" attributeType="XML" begin="0" dur="1s" type="scale" from="1" to="2" fill="freeze" repeatCount="2"></animateTransform>
      </circle>
    </svg>
  </div>

  animateMotion
  <div class="container">
    <svg width="200" height="200">
      <rect x="0" y="0" fill="red" width="10" height="10">
        <animateMotion
          path="M10 10 L110 10 L110 110 L10 110 Z"
          dur="3s"
          rotate="0"
          fill="freeze"
          repeatCount="2"
        ></animateMotion>
      </rect>
      <path d="M10 10 L110 10 L110 110 L10 110 Z" fill="none" stroke="green"></path>
    </svg>
  </div>
  <div class="container">
    <svg width="200" height="200">
      <rect x="0" y="0" fill="red" width="10" height="10">
        <animateMotion
          id="forward-rect"
          path="M10 10 L110 10 L110 110 L10 110"
          dur="3s"
          rotate="0"
          fill="freeze"
          begin="0; backward-rect.end + 0.5s"
        ></animateMotion>
        <animateMotion
          id="backward-rect"
          path="M10 110 L110 110 L110 0 L10 10"
          dur="3s"
          rotate="0"
          fill="freeze"
          begin="forward-rect.end + 0.5s"
        ></animateMotion>
        <animate
          id="red-to-blue"
          attributeName="fill" attributeType="XML" from="red" to="blue" dur="3s" fill="freeze"
          begin="0; blue-to-red.end + 0.5s"
        ></animate>
        <animate
          id="blue-to-red"
          attributeName="fill" attributeType="XML" from="blue" to="red" dur="3s" fill="freeze"
          begin="red-to-blue.end + 0.5s"
        ></animate>
      </rect>
      <path d="M10 10 L110 10 L110 110 L10 110" fill="none" stroke="green"></path>
    </svg>
  </div>

  点击变色或位移
  <div class="container">
    <svg viewBox="0 0 200 200" width="200" height="200">
      <g id="rect1">
        <rect x="0" y="0" rx="0" ry="0" width="100" height="100" fill="red">
          <animate
            attributeName="fill" attributeType="XML"
            from="red"
            to="green"
            begin="rect1.click"
            dur="2s"
            fill="freeze"
          />
        </rect>
      </g>
      <animateTransform
        attributeType="XML" attributeName="transform" type="translate"
        from="0, 0" to="50, 50"
        begin="rect1.click"
        dur="2s"
        fill="freeze"
      />
      <rect x="0" y="100" width="100" height="100" fill="blue">
        <animate
          attributeType="XML" attributeName="fill"
          from="blue" to="green"
          begin="rect1.click"
          dur="2s"
          fill="freeze"
        ></animate>
      </rect>
    </svg>
  </div>

  <br><br><br>

  蒙版
  <div class="container">
    <svg width="400" height="400">
      <defs>
        <mask id="test-mask">
          <rect x="5" y="5" width="390" height="390" fill="red"></rect>
          <circle r="50" cx="150" cy="100"></circle>
        </mask>
      </defs>
      <rect x="5" y="5" width="390" height="390" fill="red"></rect>
      <rect x="5" y="5" width="390" height="390" fill="blue"
        mask="url(#test-mask)"
      ></rect>
    </svg>
  </div>

  <br><br><br>

  渐变色
  <div class="container">
    <svg width="400" height="400">
      <defs>
        <linearGradient id="test-linear-gradient">
          <stop offset="0%" stop-color="red" stop-opacity="1"></stop>
          <stop offset="50%" stop-color="green"></stop>
          <stop offset="100%" stop-color="blue" stop-opacity="0"></stop>
        </linearGradient>
      </defs>
      <rect x="5" y="5" width="390" height="390" fill="url(#test-linear-gradient)"></rect>
    </svg>
  </div>
  <div class="container bg-grey">
    <svg width="400" height="400">
      <defs>
        <radialGradient id="test-radial-gradient"
          cx="50%"
          cy="50%"
          fx="25%"
          fy="75%"
          r="50%"
        >
          <stop offset="0%" stop-color="white"></stop>
          <stop offset="10%" stop-color="yellow"></stop>
          <stop offset="95%" stop-color="red" stop-opacity="1.5"></stop>
        </radialGradient>
      </defs>
      <circle r="180" cx="200" cy="200" fill="url(#test-radial-gradient)"></circle>
    </svg>
  </div>

</template>

<script>
import { ref, onMounted } from 'vue'

export default {

  setup (props, { emit }) {
    const logoRef = ref(null)

    onMounted(() => {
      // 获取path长度
      console.log('logo path length:', logoRef.value.getTotalLength())
    })

    return {
      logoRef,
    }
  },
}
</script>

<style lang="scss">
.container {
  svg{
    border: 1px solid #000;
  }
  .rect-stroke-dasharray{
    stroke-dasharray: 10 20 30;
  }
  .circle{
    // stroke-dasharray: 100 1257;
    animation: circle-move 3s linear infinite;
  }
  .rect{
    animation: rect-move 3s linear infinite;
  }
}
@keyframes circle-move{
  from {
    stroke-dasharray: 0 1257;
  }
  to {
    stroke-dasharray: 1257 0;
  }
}
@keyframes rect-move{
  from {
    stroke-dasharray: 0 800;
  }
  to {
    stroke-dasharray: 800 0;
  }
}

.line-stroke{
  stroke-dasharray: 400;
  stroke-dashoffset: 400;
  transition: stroke-dashoffset .5s ease-out;
}
.line-svg{
  &:hover{
    .line-stroke{
      stroke-dashoffset: 0;
    }
  }
}

.logo{
  fill: none;
  stroke: #333;
  stroke-width: 5;
  animation: logo-move 5s linear 1 forwards;
}
@keyframes logo-move{
  0% {
    fill: white;
    stroke: #333;
    stroke-dasharray: 6885;
    stroke-dashoffset: 6885;
  }
  50% {
    fill: white;
    stroke: #333;
    stroke-dasharray: 6885;
    stroke-dashoffset: 0;
  }
  75% {
    fill: red;
  }
  100% {
    fill: blue;
  }
}

.bg-grey{
  background: grey;
}
</style>
