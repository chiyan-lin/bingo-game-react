<template>
  <div :class="$style.container">
    <SectionTitle :class="$style.title" :title="$t('coinShop')"/>
    <div :class="$style.banner" class="row major-between minor-center">
      <div :class="$style.pro" class="row major-center minor-center">
        {{$t('coins')}}
        <div class="coin"></div>&nbsp;
        <span>: {{ user.coin }}</span>
      </div>
      <div class="yellowBtn row major-center minor-center" :class="$style.history" @click="$root.$emit('showShopHistory')">
        {{$t('shoipHistory')}}
      </div>
    </div>
    <div :class="[$style.itemGift, $style.center]" v-for="(v, i) in boxes" :key="i">
      <img :src="require(`./img/${v.box_id}.png`)" />
      <div :class="$style.name">{{$t(`${v.box_id}Chest`)}}</div>
      <div :class="$style.giftList" class="row major-center minor-center">
        <Gift :info="reward" :class="$style.gift" v-for="(reward, ridx) in v.rewards" :key="ridx"/>
      </div>
      <div class="yellowBtn row major-center minor-center" :class="$style.btn" @click="$emit('on-buy', 'box', v.box_id)">
        <div class="coin"></div>&nbsp;
        {{ v.price }}
      </div>
    </div>
    <div :class="[$style.itemPrize, $style.center]" v-for="(v, i) in goods" :key="i">
      <Gift :info="v.good.reward" :class="$style.prize" :showName="true"/>
      <div :class="$style.name">&nbsp;</div>
      <div :class="$style.limit">{{$t('haveGood')}}：{{v.inventory}}</div>
      <div class="yellowBtn row major-center minor-center" :class="$style.btn" @click="$emit('on-buy', 'good', v.good.good_id, v.good.reward)">
        <div class="coin"></div>&nbsp;
        {{ v.good.price }}
      </div>
    </div>
  </div>
</template>

<script>
import SectionTitle from '@/shared/components/SectionTitle'
import Gift from '@/shared/components/Gift'

export default {
  props: {
    data: Object,
    user: Object
  },
  components: {
    SectionTitle,
    Gift
  },
  computed: {
    boxes () {
      return this.data.boxes
    },
    goods () {
      return this.data.good_infos
    }
  }
}
</script>

<style lang="scss" module>
.container {
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 35px;
  width: 100%;
  padding: 0 20px;
  width: 690px;
  background-color: #00ab86;
  border-radius: 30px;
  border: solid 4px #daffe4;
  margin-bottom: 40px;
}
.limit {
  color: #007b6c;
  font-size: 26px;
  margin: -5px auto 6px;
}
.banner {
  position: absolute;
  width: 100%;
  top: 90px;
  left: 0;
  padding: 0 20px;
}
.pro {
  color: #fff;
  span {
    color: #E9F657;
  }
}
.history {
  padding: 5px 15px;
  font-weight: 500;
  font-size: 26px;
}
.center {
  display: inline-flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}
.title {
  margin-bottom: 70px;
}
.name {
  font-size: 30px;
  color: #007b6c;
  font-weight: bold;
  margin: 6px auto;
}

.giftList {
  margin: 6px auto 12px;
}
.gift {
  @include whl(60px, 60px);
  margin: 0 3px;
}
.itemGift {
  @include bg('box', 313px, 381px);
  padding-top: 140px;
  position: relative;
  > img {
    width: 200px;
    height: 200px;
    top: -8px;
    @include placeMiddleLeft();
  }
}
.icon {
  width: 160px;
  height: 160px;
  margin-top: 20px;
}
.prize {
  @include whl(230px, 140px);
  position: relative;
  overflow: visible;
  img {
    width: 50%;
  }
  > div {
    bottom: -53px;
    @include placeMiddleLeft();
    font-size: 30px;
    color: #007b6c;
    font-weight: bold;
    height: 50px;
    line-height: 50px;
    z-index: 9;
    white-space: nowrap;
  }
}
.itemPrize {
  background: #B8FFCB;
  box-shadow: 0px 4px 0px 4px
  #007b6c;
  border-radius: 10px;
  border: solid 3px #007b6c;
  position: relative;
  width: 313px;
  height: 340px;
  &_icon {
    width: 160px;
    height: 160px;
    margin-top: 20px;
  }
  &_name {
    color: #000;
    flex: 1;
  }
}
.btn {
  width: 260px;
  height: 56px;
  line-height: 56px;
  box-shadow: 0px 4px 0px 0px #dd7b2d !important;
  border-radius: 28px !important;
  font-size: 28px;
  font-weight: bold;
}
</style>
