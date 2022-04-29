<template>
  <div :class="$style.container">
    <SectionTitle :title="$t('lotteryTit')"/>
    <p :class="$style.tip">{{$t('lotteryTit2')}}</p>
    <div :class="$style.main" class="greGradBg">
      <div :class="$style.warn" class="row major-center minor-center">
        <Gift :info="{reward_id:'bean',reward_type:0}" :class="$style.gift" />&nbsp;&nbsp;
        <div class="col major-center minor-center">
          <div :class="$style.info1">{{$t('doller', [data.goldbean/24000])}}</div>
          <div :class="$style.info2">{{$t('countdown')}}</div>
          <Countdown :time="data.rest_secs*1000+5000" @on-end="$emit('on-end')"/>
        </div>
      </div>
      <div :class="$style.record" class="row major-between minor-center">
        <div class="row major-start minor-center nowrap">
          &nbsp;<template v-if="data.last_code">
            {{$t('prevCode')}}&nbsp;
            <img :src="data.last_winner.avatar" alt="">&nbsp;
            {{data.last_code}}
          </template>
        </div>
        <span @click="$root.$emit('showPrizeRecord')">{{$t('history')}}></span>
      </div>
    </div>
    <div :class="$style.myInfo" class="row major-between minor-center">
      <div @click="$root.$emit('showMyLotteryCode')">{{$t('myCodeCount')}}: <span>{{data.my_codes}}</span> ></div>
      <!-- <div>{{$t('winChange')}}: <span>{{(+(data.my_codes/data.total_codes).toFixed(2)*100)||0}}%</span></div> -->
    </div>
    <div class="row major-center minor-center">
      <CodeItem v-for="(code, idx) in codelist" :key="idx" :code="code" @on-buy="$emit('on-buy', code)"/>
    </div>
  </div>
</template>

<script>
import Countdown from '@/shared/components/Countdown'
import SectionTitle from '@/shared/components/SectionTitle'
import CodeItem from './components/CodeItem'
import Gift from '@/shared/components/Gift'

export default {
  props: {
    data: Object
  },
  components: {
    SectionTitle,
    Countdown,
    CodeItem,
    Gift
  },
  data () {
    return {
      timeArray: [],
      codelist: [
        { amount: 1, cost: 5 },
        { amount: 50, cost: 250 },
        { amount: 500, cost: 2500 }
      ]
    }
  }
}
</script>

<style lang="scss" module>
.container {
  width: 690px;
  min-height: 705px;
  background-color: #00ab86;
  border-radius: 30px;
  border: solid 4px #daffe4;
  color: #007b6c;
  padding-bottom: 50px;
}
.tip {
  color: #fff;
  width: 93%;
  margin: 20px auto;
  text-align: center;
}
.main {
  width: 650px;
  height: 280px;
  border: solid 3px #007b6c;
  margin: 0 auto;
}
.warn {
  margin: 22px auto;
}
.gift {
  width: 230px;
  height: 143px;
  img {
    width: 80% !important;
  }
}
.info1 {
  font-size: 34px;
  font-weight: bold;
}
.info2 {
  margin: 14px auto 12px;
}
.record {
  border-top: 1px dashed #39a681;
  width: 95%;
  margin: 0 auto;
  font-weight: bold;
  padding-top: 10px;
  img {
    width: 40px;
    border: solid 3px #007b6c;
    height: 40px;
    border-radius: 50%;
  }
  span {
    text-decoration: underline;
  }
}
.myInfo {
  color: #fff;
  padding: 0 18px;
  margin: 20px auto 10px;
  span {
    color: #ffff50;
  }
}

</style>
