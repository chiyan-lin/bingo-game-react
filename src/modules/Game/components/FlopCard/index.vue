<template>
  <div :class="[$style.container, $style[`ct${limit}`]]">
    <div :class="$style.guide" v-if="lv===0">
      <div :class="$style.guideTip" class="col major-center minor-start">{{flopStatus}}</div>
    </div>
    <div :class="[$style.flop, $style[`flop${limit}`]]" class="col major-between minor-center">
      <div :class="$style.row" class="row major-between minor-center" v-for="(row, rowNum) in gameData" :key="rowNum">
        <div :class="[$style.col, $style[`block${limit}`]]" v-for="(col, colNum) in row" :key="colNum">
          <!-- 翻卡完成的隐藏 -->
          <div :class="[col.isMatch && $style.cardHidden, $style.colIteme, $style[`colStatus${col.status}${type}`], col.index === false && $style[`colEmpty${type}`]]" @click="onClickCard(rowNum, colNum)">
            <VueSvga
              v-if="col.showGuide"
              :class="$style.guideFinger"
              :url='require("./img/guide.svga")'
              :options='{loop: 0}'
            />
            <Turnover v-if="col.status===2" :match="col.isMatch" >
              <div slot="front" :class="[$style.colItemf, $style[`colItemf${type}`]]"></div>
              <img slot="back" :class="$style.colItemb" :src="require(`./img/${col.value}.png`)">
            </Turnover>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { getLimit } from '../../common/config'
import { sleep } from '@/shared/common/util'
import { preloadImgSerial } from '@yy/preload'
import Turnover from './components/Turnover'

let prevCard = null
let nextCard = null
let autoVal
let isGuideEnd = false

export default {
  components: {
    Turnover
  },
  data () {
    // 因为引导要加这种东西 0 please flop 1 flop next 2 flop right 3 flop wrong
    return {
      flopState: 0
    }
  },
  props: {
    gameData: Array,
    result: Object,
    type: Number,
    grid: Number,
    lv: Number
  },
  computed: {
    limit () {
      return getLimit(this.grid)
    },
    flopStatus () {
      return [
        this.$t('guide0'),
        this.$t('guide1'),
        this.$t('guide2'),
        this.$t('guide3')
      ][this.flopState]
    }
  },
  watch: {
    async result () {
      // 返回的卡牌先加载一下
      const card = this.result.grid_types
      if (!card) { return }
      const { rowNum, colNum } = nextCard
      await preloadImgSerial(card.map(v => {
        return require(`./img/${card[0] === card[1] ? v : `${v}x`}.png`)
      }))
      // 如果相同的卡牌
      if (card[0] === card[1]) {
        this.updateGameItem(rowNum, colNum, card, true)
        this.flopState = 2// 引导逻辑
      } else {
        this.flopState = 3// 引导逻辑
        // 牌错了 先展示下错误的卡图，然后 1500ms 之后，再翻回去
        this.updateGameItem(rowNum, colNum, card.map(t => `${t}x`), false)
        await sleep(1500)
        this.updateGameItem(rowNum, colNum, null, true)
      }
    }
  },
  methods: {
    flopBack () {
      prevCard.disable = false
      this.onClickCard(nextCard.rowNum, nextCard.colNum, false)
      this.onClickCard(prevCard.rowNum, prevCard.colNum)
      this.reset()
    },
    reset () {
      prevCard = null
      nextCard = null
    },
    updateAutoVal (val = 1) {
      autoVal = val
      this.reset()
    },
    async onClickCard (rowNum, colNum, nullPrev = true) {
      const target = this.gameData[rowNum][colNum]
      if ((prevCard && prevCard.disable) || target.index === false || target.status === 2) { return }
      // 用户选择1张牌的时候，再点击那张牌，是取消
      if (target.status === 1) {
        target.status = 0 // 再翻盖牌
        if (target.index === (autoVal - 1)) {
          // 如果刚好 index 是 累增出来的值 要把 autoVal 减一下
          autoVal--
          target.index = true
        }
        nullPrev && (prevCard = null)
        // 如果是引导取消的话 手指要显示回来// 引导逻辑
        if (target.showGuide === null && !isGuideEnd && this.lv === 0) {
          target.showGuide = true
          this.gameData[1][1].showGuide = false
          this.flopState = 0
        }
        // 引导逻辑
        return
      }
      if (target.index === true) {
        target.index = autoVal++ // 重新更细点击的位置的下标
      }
      target.status = 1 // 翻牌
      // 只有 lv0 的是会触发这个逻辑 所以这里就写死了
      if (!isGuideEnd && this.lv === 0) {
        target.showGuide = null
        if (rowNum === 0 && colNum === 0) {
          // 不按引导的点就直接不引导了
          this.gameData[0][0].showGuide = false
          this.gameData[1][1].showGuide = true
        } else {
          this.gameData[0][0].showGuide = false
          this.gameData[1][1].showGuide = false
          isGuideEnd = true
        }
        this.flopState = 1
      }
      let { index, order } = target
      if (prevCard) { // 回合第二次翻牌
        prevCard.disable = true // 翻牌锁
        // 引导逻辑
        isGuideEnd = true
        target.showGuide = false
        // 引导逻辑
        nextCard = { rowNum, colNum, index, order }
        const orders = [
          { h5_pos: prevCard.order, order: prevCard.index },
          { h5_pos: nextCard.order, order: nextCard.index }
        ]
        this.$emit('on-flop', orders)
      } else { // 回合第一次翻牌
        prevCard = { rowNum, colNum, index, order }
      }
    },
    updateGameItem (rowNum, colNum, value, reset = false) {
      const present = this.gameData[rowNum][colNum]
      const prev = this.gameData[prevCard.rowNum][prevCard.colNum]
      present.status = value ? 2 : 0
      prev.status = value ? 2 : 0
      if (value) {
        prev.value = value[0]
        present.value = value[1]
        if (value[0] === value[1]) {
          prev.isMatch = true
          present.isMatch = true
        }
      }
      if (reset) {
        prevCard = null
      }
    }
  }
}
</script>

<style lang="scss" module>
.guide {
  @include bg('guide', 155px, 208px);
  position: absolute;
  left: 0px;
  top: -140px;
  &Tip {
    position: relative;
    left: 145px;
    top: 24px;
    background-color: #fff;
    border: 4px solid #05803B;
    border-left: 0;
    border-radius: 0px 50px 50px 0px;
    height: 98px;
    color: #05803B;
    width: 420px;
    padding-right: 20px;
  }
  &Finger {
    width: 100px;
    height: 100px;
    position: absolute;
    bottom: -10px;
    right: -10px;
  }
}

.container {
  position: relative;
  width: 100%;
}
.ct2 {
  margin-top: 150px;
}
.ct3 {
  margin-top: 120px;
}
.ct4 {
  margin-top: 140px;
}
.ct5 {
  margin-top: 90px;
}
$gameitemmargin: 5px;
.flop {
  margin: 0 auto;
  position: relative;
  div {
    width: 100%;
    height: 100%;
  }
}
.flop2 {
  width: 510px + $gameitemmargin;
  height: 510px + $gameitemmargin;
}
.block2 {
  width: 224px !important;
  height: 245px !important;
}
.flop3 {
  width: 550px + $gameitemmargin;
  height: 550px + $gameitemmargin;
}
.block3 {
  width: 157px !important;
  height: 175px !important;
}
.flop4 {
  width: 510px + $gameitemmargin;
  height: 510px + $gameitemmargin;
}
.block4 {
  width: 112px !important;
  height: 119px !important;
}
.flop5 {
  width: 620px + $gameitemmargin;
  height: 620px + $gameitemmargin;
}
.block5 {
  width: 112px !important;
  height: 119px !important;
}
.row {
  margin: $gameitemmargin 0;
}
.cardHidden {
  opacity: 0;
  transition: 1.5s 0.5s opacity ease;
}
.col {
  flex: 1;
  text-align: center;
  margin: 0 $gameitemmargin;
  &Iteme {
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: relative;
  }
  &Itemf {
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    &0 {
      background-image: url('./img/common/select.png');
    }
    &1 {
      background-image: url('./img/ad/select.png');
    }
  }
  &Itemb {
    width: 100%;
    height: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
  &Status0 {
    &0 {
      background-image: url('./img/common/front.png');
    }
    &1 {
      background-image: url('./img/ad/front.png');
    }
  }
  &Status1 {
    &0 {
      background-image: url('./img/common/select.png');
    }
    &1 {
      background-image: url('./img/ad/select.png');
    }
  }
  &Status2 {
    &0 {
      background-image: url('./img/common/bottom.png');
    }
    &1 {
      background-image: url('./img/ad/bottom.png');
    }
  }
  &Empty {
    &0 {
      background-image: url('./img/common/placeholder.png');
    }
    &1 {
      background-image: url('./img/ad/placeholder.png');
    }
  }
}

</style>
