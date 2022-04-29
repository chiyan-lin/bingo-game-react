<template>
  <div class="col major-between minor-start" :class="$style.container">
    <div :class="$style.coin" class="row major-between minor-center">
      {{$t('coins')}}&nbsp;
      <div class="coin"></div>&nbsp;:&nbsp;
      <NumberChange :number="data.coin" :from="1"/>&nbsp;
      <div class="yellowBtn" :class="$style.btn" @click="$root.$emit('showCoinShop', 1)">{{$t('add')}}</div>
    </div>
    <div :class="$style.time" class="row major-between minor-center" id="myCard">
      {{$t('freeCard')}}&nbsp;<div class="coin" :class="$style.ticket"></div>&nbsp;:&nbsp;<span>{{ data.ticket }}</span> &nbsp;&nbsp;
      <div class="yellowBtn" :class="$style.btn" @click="$root.$emit('showDailyTask', 'show', 1)">{{$t('add')}}</div>
    </div>
  </div>
</template>

<script>
import NumberChange from '@/shared/components/NumberChange'

export default {
  props: {
    data: Object
  },
  components: {
    NumberChange
  }
}
</script>

<style lang="scss" module>

.container {
  color: #fff;
  padding: 0 24px;
  margin: 20px auto;
  span {
    color: #ffff50;
  }
  > div {
    white-space: nowrap;
  }
}
.btn {
  width: 121px;
  height: 40px;
  line-height: 40px;
}
.time {
  margin-top: 10px;
}
.ticket {
  background-image: url('./img/ticket.png');
  width: 55px;
  height: 31px;
}
</style>
