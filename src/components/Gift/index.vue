<template>
  <div :class="$style.gift" v-if="info">
    <img :src="gifts&&gifts.url" alt="">
    <div v-if="showName&&gifts&&gifts.name">
      {{$t(gifts&&gifts.name)}}<slot/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: Object,
    showName: Boolean
  },
  computed: {
    gifts () {
      return this.$$store.giftConf && this.info && this.$$store.giftConf[`${this.info.reward_id}-${this.info.reward_type}`]
    }
  }
}
</script>

<style lang="scss" module>
.gift {
  background-color: #fff;
  border-radius: 6px;
  border: solid 3px #39a681;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 80%;
  }
}
</style>
