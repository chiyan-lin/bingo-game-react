<template>
  <div :class="$style.contianer">
    <p :class="$style.tip" class="row major-center minor-center">{{$t('completeTip')}}</p>
    <div :class="$style.lvWrap" ref="lv-scroll" style="direction: ltr;">
      <div :class="$style.lvWrapScroll">
        <LvItem ref="lv-item" @click.native="slide(idx)" :select="select" :limit="conf.limit" :lock="conf.lock" :level="conf.lv" :star="conf.star" v-for="(conf, idx) in data" :key="idx"/>
      </div>
    </div>
  </div>
</template>

<script>
import LvItem from './components/LvItem'

export default {
  props: {
    data: Array,
    select: Number
  },
  components: {
    LvItem
  },
  mounted () {
  },
  computed: {
    len () {
      return this.data.length - 1
    }
  },
  methods: {
    slideTo (i) {
      const srcEl = this.$refs['lv-item'][i].$el
      const distance = srcEl.offsetLeft - (srcEl.offsetWidth / 2) - 5
      const target = this.$refs['lv-scroll']
      try {
        target.scrollTo({
          left: distance,
          behavior: 'smooth'
        })
      } catch (e) {
        target.scrollLeft = distance
      }
    },
    slide (i) {
      this.$emit('on-change', i)
      this.slideTo(i)
    }
  }
}
</script>

<style lang="scss" module>

.contianer {
  // OPPO R7 Plus 兼容性问题
  position: relative;
  z-index: 9;
}
.lvWrap {
  width: 560px;
  height: 150px;
  margin: 0 auto;
  overflow: auto;
  position: relative;
}
.lvWrapScroll {
  width: auto;
  white-space: nowrap;
  height: 100%;
  position: relative;
}

.tip {
  width: 442px;
  color: #fff;
  margin: 16px auto;
  min-height: 80px;
  text-align: center;
}
</style>
