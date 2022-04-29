<template>
  <div :class="$style.container">
    <div :class="[$style.level, lock ? $style.levelLock : $style.levelHigh, select===level && !lock && $style.levelLow]">
      <LV :class="[$style.lv, level === 0 && $style.lv0]" :level="level" />
    </div>
    <div :class="[$style.starWrap]">
      <div :class="$style.lock" v-if="lock"></div>
      <template v-else><div :class="[$style.star, limit === 4 && $style.star14, i <= star && $style.starActive ]" v-for="i in limit" :key="i"></div></template>
    </div>
    <div v-show="select===level" :class="$style.triangle" class="triangle"></div>
  </div>
</template>

<script>
import LV from '@/shared/components/LV'

export default {
  props: {
    level: Number,
    star: Number,
    limit: Number,
    lock: Boolean,
    select: Number
  },
  components: {
    LV
  }
}
</script>

<style lang="scss" module>

.container {
  position: relative;
  margin: 0 5px;
  display: inline-block;
  vertical-align: top;
}
.level {
  width: 110px;
  height: 110px;
  background-size: 100% 100%;
  text-align: center;
}
.levelLow {
  background-image: url('./img/Lv-low.png') !important;
}
.levelHigh {
  background-image: url('./img/Lv-high.png');
}
.levelLock {
  background-image: url('./img/Lv-lock.png');
}

.lv {
  margin-top: 35px;
  width: 60px;
  height: 28px;
}
.lv0 {
  width: 75% !important;
  margin-top: 40px !important;
}

.star {
  width: 27px;
  height: 30px;
  background-size: 100% 100%;
  background-image: url('./img/star.png');
  display: inline-block;
}
.star14 {
  &:nth-child(1) {
    margin-bottom: 12px;
  }
  &:nth-child(4) {
    margin-bottom: 12px;
  }
}
.starWrap {
  position: absolute;
  bottom: -10px;
  width: 100%;
  left: 0;
  text-align: center;
}
.starActive {
  background-image: url('./img/star-active.png') !important;
}
.lock {
  @include bg('lock', 33px, 43px);
  margin: 0 auto 10px;
}
.triangle {
  left: 50%;
  transform: translateX(-50%);
  bottom: -30px;
  z-index: 888;
}
</style>
