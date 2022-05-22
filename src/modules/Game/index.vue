<template>
  <main :class="[$style.game, gameInfo.type === 1 && $style.gameAdvance]">
    <Dashboard v-if="gameInfo&&userInfo" :lv="gamelv" :userInfo="userInfo" @on-back="gameBack" @on-reset="resetGame"/>
    <Star v-if="gameInfo" :type="2" :lv="gamelv" :star="gameInfo.star" :limit="gameInfo.limit" :showTip="true"/>
    <Banner :flop="gameInfo.flop" :lv="gamelv"/>
    <!-- <div :class="$style.debugger">调试信息 {{ willbedelete }}</div> -->
    <FlopCard ref="flop" :lv="gamelv" :grid="gameInfo.grids" :gameData="gameData" :result="gameResult" :type="gameInfo.type" @on-flop="flop"/>
    <!-- 这个奖励是有随机性的 -->
    <Reward v-if="gameInfo.reward" :class="[gameInfo.reward.length > 1 ? $style.rewardMul : $style.rewardOne]" :data="gameInfo.reward">
      <div :class="$style.tip" v-show="gameInfo.reward.length > 1">
        <p>{{$t('gameRwTip2')}}</p><p>{{$t('gameRwTip1')}}</p>
      </div>
    </Reward>
    <!-- 下面是真实的奖励 -->
    <Win v-if="showWin" :data="gameInfo" :star="winStar" :reward="winReward" @on-back="gameBack(1)" @on-continue="gameContinue"/>
  </main>
</template>

<script>
// import hagoAppCall from '@/shared/common/hagoAppCall'
import FlopCard from './components/FlopCard'
import Dashboard from './components/Dashboard'
import Reward from './components/Reward'
import Banner from './components/Banner'
import Star from './components/Star'
import Win from './components/Win'
import { getCheckBoard } from './common/config'
import { bingoStorage } from '@/shared/common/gameStorage'

import {
  Flop,
  GetInfo
} from '@/shared/common/api'

export default {
  props: {},
  components: {
    Banner,
    Reward,
    Dashboard,
    FlopCard,
    Star,
    Win
  },
  data () {
    return {
      // willbedelete: null,
      checkerboard: null,
      isHasLv0: false,
      showWin: false,
      winReward: {},
      winStar: 0,
      userInfo: {},
      gameInfo: {},
      gameData: [],
      gameResult: {}
    }
  },
  computed: {
    gamelv () {
      return this.gameInfo.lv
    }
  },
  mounted () {
    this.eventLaunch()
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$root.$emit('gameInit', async (gameInfo) => {
        // 每次进来的时候从 home 捞回来最新的游戏信息，使用 vux 就这样吧
        vm.gameInfo = gameInfo
        vm.isHasLv0 = vm.gamelv === 0
        await vm.updateUserInfo()
        // 猪油首次进来 胜利了的话 时候需要洗牌
        vm.shuffle()
        // 游戏页面曝光
        vm.$report({ function_id: 'game_pg_show', game_level_number: vm.gamelv, game_level: vm.gameInfo.type })
      })
    })
  },
  methods: {
    eventLaunch () {
      this.$root.$on('game-updateUserInfoByBackend', this.updateUserInfo)
      // 在游戏页面调用更新首页的用户信息
      this.$root.$on('game-updateUserInfo', (userInfo) => {
        this.userInfo = userInfo
      })
    },
    gameBack (from) {
      // 回退要更新首页的资源
      this.$root.$emit('updateLvInfo', () => {
        this.$router.go(-1)
        this.updateUserInfo()
      }, this.isHasLv0)
      if (from) {
        // 游戏奖励弹框点击
        this.$report({ function_id: 'game_reward_popup_click', reward_result: 0 })
      }
    },
    // 继续下一关的方法，首页会重新开始下一局，这里要重新洗牌
    gameContinue () {
      // 游戏奖励弹框点击
      this.$report({ function_id: 'game_reward_popup_click', reward_result: 1 })
      const { index, conditionNext } = this.gameInfo
      const isNext = !conditionNext || this.gameInfo.star >= conditionNext || this.winStar < conditionNext
      const newIndex = isNext ? index : index + 1
      // 新解锁星星，点击继续游戏，游戏页面不会更新星星等级
      if (this.winStar > this.gameInfo.star) {
        // 只有点击继续的时候，才更新
        this.gameInfo.star = this.winStar
      }
      // 要计算下当前的等级是否满星 满星继续就开始下一级
      this.$root.$emit('updateSelectAndPlay', newIndex, isNext ? this.gameInfo.star : false, async (gameInfo) => {
        // 点击继续或者下一关的时候更新个人信息
        await this.updateUserInfo()
        this.gameInfo = gameInfo
        this.shuffle()
      })
    },
    // 通过接口拉取最新的钻石数以及券数
    async updateUserInfo () {
      const rsp = await GetInfo()
      if (rsp.result.errcode === 0) {
        this.userInfo = { coin: rsp.coin, ticket: rsp.ticket }
        // 每次在更新游戏页的个人信息的时候 也更新下首页的 防止回去的时候有金币动画
        this.$root.$emit('home-updateUserInfo', this.userInfo)
      }
    },
    // 前端计算钻石数以及券数，最后胜利或者重进页面的时候每次都要调接口更新
    async caclUserInfo () {
      let { coin, ticket } = this.userInfo
      const { coin: d, ticket: t } = this.gameInfo.flop
      if (t <= ticket) {
        ticket = ticket - t
      } else if (d <= coin) {
        coin = coin - d
      }
      this.userInfo = { ticket, coin }
      // 修改同步回首页 确保回到首页的时候，有动画
      this.$root.$emit('home-updateUserInfo', this.userInfo)
    },
    // 重置游戏
    resetGame () {
      // 重置游戏二次确认弹窗曝光
      this.$report('reset_game_ reconfirmation_popup_show')
      this.$root.$emit('showContinue', {
        cancelTxt: this.$t('cancel'),
        contionueTxt: this.$t('resetIt'),
        cont: this.$t('resetGame'),
        confirm: () => {
          this.$root.$emit('gameRestart', async (gameInfo) => {
            // 重置游戏二次确认弹窗点击
            this.$report({ function_id: 'reset_game_ reconfirmation_popup_click', reset_result: bingoStorage.get('checkBoard') ? 1 : 0 })
            this.gameInfo = gameInfo
            await this.updateUserInfo()
            this.shuffle()
          })
        }
      })
    },
    shuffle () {
      // 对未完成的局进行处理，先把数组转换成 h5_pos 建立起来的 map
      let unfinshRound = this.gameInfo.grid_infos || []
      let unfinshPosMap = {}
      unfinshRound && unfinshRound.forEach(info => {
        unfinshPosMap[info.h5_pos] = info
      })
      // 获取配置计算棋盘
      let order = 0
      const checkBoard = bingoStorage.get('checkBoard') || getCheckBoard(this.gameInfo.grids)
      bingoStorage.set('checkBoard', checkBoard)
      this.gameData = checkBoard.map((row, ridx) => {
        return row.map((col, cidx) => {
          order += col
          const isGood = !!col
          const unfinishPos = (isGood && unfinshPosMap[order]) || {}
          return {
            index: unfinishPos.order || isGood, // 下标位置 对应接口的 order index 为 0 则是空白 当为 true 的时候，是可以被翻开的卡牌
            status: unfinishPos.is_bingo ? 2 : 0, // 卡牌状态 0盖着 2翻开
            value: unfinishPos.grid_type || 0, // 卡牌的值 对应ui 1-10 默认是 0
            order, // 配置里面从左到右 从上到下 的第几个 1,
            isMatch: unfinishPos.is_bingo,
            showGuide: this.gamelv === 0 && !ridx && !cidx // 如果是 lv0 而且是是第 0 行 第 0 个就展示手指
          }
        })
      })
      this.showWin = false
      // 更新 flop 的自增索引的起始值
      this.$refs.flop.updateAutoVal(unfinshRound.length + 1)
    },
    async flop (positions) {
      const rsp = await Flop({
        positions,
        record_id: this.gameInfo.record_id
      })
      if (rsp.result.errcode === 0) {
        this.gameResult = {
          tiemStamp: +new Date(), // 时间印章 确保能触发watch
          grid_types: rsp.grid_types,
          is_record_done: rsp.is_record_done,
          star: rsp.star
        }
        if (rsp.is_record_done) {
          // 游戏奖励弹框曝光
          this.$report({ function_id: 'game_reward_popup_show', round_id: this.gameInfo.record_id })
          // 更新 gameinfo 的 star 信息
          const rw = rsp.reward
          this.winStar = rsp.star
          // 获取完成游戏的礼物
          this.winReward = [{ amount: rsp.coin, reward_id: 0, reward_type: 100 }] // 插入奖励的代币
          // 谢谢参与奖不操作 其他的插入
          if (!rw.reward_id && !rw.reward_type) {
          } else {
            this.winReward.push(rw)
          }
          // 完成清空 checkBoard
          bingoStorage.set('checkBoard', '')
          // 如果是获得了免费抽卡次数记录到存储里面
          // if (rw.reward_type === 100) {
          //   const card = bingoStorage.get('gameFreeCard') || 0
          //   bingoStorage.set('gameFreeCard', rw.amount + card)
          // }
          // 1500 后显示游戏胜利的弹层
          setTimeout(() => { this.showWin = true }, 1500)
        }
        this.caclUserInfo()
      }
      if (rsp.result.errcode === 10005) {
        // 弹出银币充值
        this.$root.$emit('showCoinShop', 2, () => {
          this.flop(positions)
        }, () => {
          this.$refs.flop.flopBack()
        })
      }
    }
  }
}
</script>

<style lang="scss" module>

.debugger {
  position: absolute;
  left: 0;
}

.game {
  @include bgf('bg', 100%, 100%);
  background-color: #00AB75;
  position: relative;
  overflow: hidden;
}
.gameAdvance {
  background-image: url('./img/bg-advance.png') !important;
}
.rewardMul {
  @include bg('reward-bg-mul', 720px, 155px);
  left: 0;
  bottom: 0px;
  position: absolute;
  padding-left: 188px;
  > div {
    position: relative;
    top: -60px;
    &:first-child {
      position: absolute;
      left: 25px;
      top: -60px;
    }
  }
}
.rewardOne {
  @include bg('reward-bg', 720px, 155px);
  left: 0;
  bottom: -20px;
  position: absolute;
  > div {
    position: relative;
    top: -40px;
  }
}
.tip {
  color: #fff;
  width: 100%;
  text-align: center;
  position: absolute !important;
  bottom: 20px;
  left: 0;
  top: auto !important;
  direction: ltr;
  p {
    display: inline-block;
    &:lang(ar) {
      direction: rtl;
    }
  }
  :first-child {
    width: 23%;
  }
  :last-child {
    width: 75%;
  }
}
</style>
