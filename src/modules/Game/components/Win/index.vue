<template>
  <div :class="$style.container">
    <div :class="$style.win">
      <div :class="$style.winImg"></div>
      <Star :limit="data.limit" :star="star" :type="1" :class="$style.star"/>
      <p :class="$style.lv">Lv. {{data.lv}}</p>
      <p :class="$style.tip">{{$t('winTip1')}}</p>
      <Reward :class="$style.reward" :data="reward" type="win"/>
      <div class="row major-center minor-center">
        <div :class="[$style.btn, $style.back]" @click="$emit('on-back')">{{$t('goHome')}}</div>
        <div :class="[$style.btn, $style.continue]" @click="$emit('on-continue')">
          {{btnStatus}}
        </div>
      </div>
      <!-- <p :class="$style.alert">{{$t('winTip2')}}</p> -->
    </div>
  </div>
</template>

<script>
import Star from '../Star'
import Reward from '../Reward'

export default {
  props: {
    data: Object,
    reward: Array,
    star: Number
  },
  components: {
    Star,
    Reward
  },
  computed: {
    btnStatus () {
      const cn = this.data.conditionNext
      // 历史星星数大于下雨管条件的显示继续游戏 或者 当前完成游戏的星星数对下一关限制
      return !cn || this.data.star >= cn || this.star < cn
        ? this.$t('continue')
        : this.$t('openNext', [this.data.lv + 1])
    }
  }
}
</script>

<style lang="scss" module>

.container {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  color: #fff;
  text-align: center;
  font-size: 28px;
}
.win {
  @include bg('tit', 714px, 790px);
  padding-top: 230px;
}
.star {
  margin-top: -10px;
}
.lv {
  font-size: 46px;
  margin-top: 20px;
}
.tip {
  width: 80%;
  margin: 0 auto;
  line-height: 42px;
}
.btn {
  width: 296px;
  height: 94px;
  line-height: 94px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  font-size: 34px;
  margin: 0 15px;
}
.back {
  background-image: url('./img/back.png');
  text-shadow: 0px 4px #004749;
}
.continue {
  background-image: url('./img/continue.png');
  text-shadow: 0px 4px #B40E30;
}
.alert {
  margin-top: 20px;
}
.reward {
  margin: 40px auto 70px;
}
.winImg {
  @include bg('win', 196px, 80px);
  margin: 0 auto 10px;
}
</style>
