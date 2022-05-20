<template>
  <span :class="$style.count">
    <!-- 只有在当前路由的时候才显示金币动画 -->
  <VueSvga
    v-if="isMove&&showCoin"
    :class="[$style.coin, from === 1 ? $style.home : $style.game]"
    :url='from === 1 ? require("./img/home.svga") : require("./img/game.svga")'
    :options='{loop: 1,fillMode: "forwards"}'
    @onEnd="closeSvga"
    @click.native.stop="()=>{}"
  />
    {{count}}
  </span>
</template>

<script>
let timer
let step = 1
function getStep (distance) {
  if (distance >= 50) {
    step = 4
  }
  if (distance >= 100) {
    step = 10
  }
  if (distance >= 300) {
    step = 30
  }
  if (distance >= 500) {
    step = 50
  }
}

export default {
  props: {
    number: Number,
    from: Number
  },
  data () {
    return {
      count: this.number,
      showCoin: false,
      routeName: this.$router.currentRoute.name
    }
  },
  computed: {
    currentR () {
      return {
        'game': 2,
        'home': 1
      }[this.routeName]
    },
    isMove () {
      return this.currentR === this.from
    }
  },
  methods: {
    closeSvga () {
      this.showCoin = false
    }
  },
  watch: {
    number () {
      // 不是响应式的有点麻烦
      this.routeName = this.$router.currentRoute.name
      if (!this.isMove) {
        this.count = this.number
        return
      }
      const disent = this.number - this.count
      getStep(Math.abs(disent))
      if (disent > 0) {
        this.showCoin = true
      }
      timer = setInterval(() => {
        const dis = Math.abs(this.number - this.count)
        if (dis === 0) {
          timer = null
          return clearInterval(timer)
        }
        if (dis <= step) {
          step = 1
        }
        if (this.count > this.number) {
          this.count = this.count - step
        } else {
          this.count = this.count + step
        }
      }, 80)
    }
  }
}
</script>

<style lang="scss" module>
.count {
  position: relative;
}
.coin {
  width: 720px;
  height: 1000px;
  position: absolute;
  z-index: 9;
}
.home {
  bottom: 0;
  left: -150px;
  &:lang(ar) {
    left: 0;
    right: -150px;
    transform: rotateY(180deg);
  }
}
.game {
  top: 0;
  left: -150px;
  &:lang(ar) {
    left: 0;
    right: 0px;
    transform: rotateY(180deg);
  }
}
</style>
