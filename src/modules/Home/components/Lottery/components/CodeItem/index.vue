<template>
  <div :class="$style.codeItem" class="greGradBg">
    <div :class="$style.codeItemIcon"></div>
    <div :class="$style.name">{{$t('lotteryCode')}} x {{ code.amount }}</div>
    <div class="yellowBtn row major-center minor-center" :class="$style.btn" @click="$emit('on-buy')">
      <div class="coin" :class="$style.coin"></div>&nbsp;
      {{ code.cost }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    code: Object
  }
}
</script>

<style lang="scss" module>

.codeItem {
  width: 200px;
  // height: 149px;
  padding-bottom: 20px;
  position: relative;
  margin: 0 10px;
}
.codeItemIcon {
  @include bg('code', 134px, 68px);
  margin: 20px auto 4px;
  font-size: 21px;
  padding: 8px 0 0 8px;
  color: #ffffff;
}
.name {
  text-align: center;
}
.btn {
  width: 160px;
  height: 46px;
  line-height: 46px;
  position: absolute;
  bottom: -30px;
  left: 18px;
}
.coin {
  width: 30px;
  height: 30px;
}
</style>
