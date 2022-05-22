<template>
  <div class="row major-center minor-start" :class="type==='win'&&$style.win">
    <template v-if="coin.amount">
      <RewardItem :info="coin" type="red" :showAmout="true" :from="type"/>
    </template>
    <RewardItem v-for="(item, idx) in gift" :key="idx" :info="item" :showAmout="type==='win'" :from="type" :class="gift.length===5&&$style.gift5"/>
    <slot />
  </div>
</template>

<script>
import RewardItem from './components/RewardItem'

export default {
  props: {
    data: Array,
    type: String
  },
  computed: {
    coin () {
      return this.data[0]
    },
    gift () {
      return this.data.slice(1)
    }
  },
  components: {
    RewardItem
  }
}
</script>

<style lang="scss" module>

.plug {
  font-size: 40px;
  color: #fff;
  align-self: center;
  -webkit-text-stroke: 1px #0A5450;
}
.win {
  > div {
    width: 178px;
    height: 183px;
    margin: 0 25px;
  }
}
.gift5 {
  width: 84px;
  height: 90px;
  top: -40px !important;
}
</style>
