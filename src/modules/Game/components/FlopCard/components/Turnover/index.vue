<template>
  <div :class="$style.turnover">
    <VueSvga
      @onEnd="closeSvga"
      v-if="match&&showBiling"
      :class="$style.biling"
      :url='require("./img/biling.svga")'
      :options='{loop: 1,fillMode: "forwards"}'
    />
    <div :class="$style.turn" ref="turn">
      <div :class="[$style.turn__face, $style.turn__front]">
        <slot name="front"/>
      </div>
      <div :class="[$style.turn__face, $style.turn__back]">
        <slot name="back"/>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    match: Boolean
  },
  data () {
    return {
      showBiling: false
    }
  },
  mounted () {
    let timer1 = null
    let timer2 = null
    timer1 = setTimeout(() => {
      this.$refs.turn.classList.add(this.$style.turn__active)
      clearTimeout(timer1)
      timer1 = null
    }, 50)
    if (this.match) {
      timer2 = setTimeout(() => {
        this.showBiling = true
        clearTimeout(timer2)
        timer2 = null
      }, 500)
    }
  },
  methods: {
    closeSvga () {
      this.showBiling = false
    }
  }
}
</script>

<style lang="scss" module>

.turnover {
  width: 100%;
  height: 100%;
  perspective: 600px;
  position: relative;
}

.turn {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.5s;
  transform-style: preserve-3d;
  &__active {
    transform: rotateY(180deg);
  }
  &__face {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
  }
  &__back {
    transform: rotateY(180deg);
  }
}
.biling {
  width: 200%;
  height: 200%;
  position: absolute;
  left: -50%;
  top: -50%;
  z-index: 9;
}
</style>
