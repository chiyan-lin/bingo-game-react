<template>
  <div :class="[$style.container, type==='red' ? $style.red : $style.green]" class="row major-center minor-center">
    <Gift :info="info" :class="$style.gift"></Gift>
    <p v-if="showAmout" :class="$style.amount">
      x {{isSpe(info.reward_type) ? $t('xdays', [0.5]) : info.amount}}
    </p>
  </div>
</template>

<script>
import Gift from '@/shared/components/Gift'

export default {
  components: {
    Gift
  },
  props: {
    info: Object,
    type: String,
    showAmout: Boolean,
    from: String
  },
  methods: {
    isSpe (rtype) {
      return [1, 2, 3, 9, 10, 12].indexOf(rtype) !== -1
    }
  }
}
</script>

<style lang="scss" module>
.container {
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 116px;
  height: 126px;
  margin: 0 6px;
  position: relative;
}
.red {
  background-image: url('./img/prize2.png');
}
.green {
  background-image: url('./img/prize.png');
}
.gift {
  width: 100%;
  background: none;
  border: 0;
  margin-bottom: 5px;
  > img {
    border-radius: 100%;
  }
  // overflow: visible;
  // > div {
  //   bottom: -60px;
  //   @include placeMiddleLeft();
  //   font-size: 30px;
  //   color: #fff;
  //   height: 50px;
  //   line-height: 50px;
  //   z-index: 9;
  //   white-space: nowrap;
  // }
}
.amount {
  white-space: nowrap;
  padding: 0 10px;
  height: 32px;
  line-height: 32px;
  background-color: #01b665;
  border-radius: 13px;
  border: solid 2px #ffffff;
  position: absolute;
  bottom: -10px;
  color: #fff;
  left: 50%;
  transform: translateX(-50%);
}
</style>
