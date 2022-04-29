<template>
  <div :class="$style.container" class="col major-starts minor-center">
    <Banner />
    <img src="./img/rank.png" :class="$style.rank" @click="goRank"/>
    <main :class="[$style.main, type === 0 ? $style.main0 : $style.main1]" class="greImgdBg">
      <SwitchTab @on-change="typeChange" v-model="type"/>
      <LvSelect v-if="isReady" :data="conf.confs" @on-change="updateSelect" :init="index" :select="selected.lv" ref="slider"/>
      <LvDetail v-if="isReady" :data="conf.rewards" :cost="conf.cost" :selected="selected"/>
      <Btn v-if="isReady" :class="$style.btn" @click.native="startGame" :disable="selected.status">
        <template v-if="!selected.status">
          {{$t('start')}}
        </template>
        <template v-if="selected.status === 1">
          {{$t('needDoneTutorital')}}
        </template>
        <template v-if="selected.status === 2">
          {{$t('nextCondition', [selected.lv - 1, conf.confs[selected.index].condition])}}
        </template>
      </Btn>
      <MyProperty v-if="isReady" :data="userInfo"/>
    </main>
    <Lottery :class="$style.mts" :data="lotteryInfo" v-if="lotteryInfo" @on-buy="buyCode" @on-end="drawLottery"/>
    <Shop v-if="shopConf" :class="$style.mts" :data="shopConf" @on-buy="shopBuy" :user="userInfo"/>
  </div>
</template>

<script>
import Banner from './components/Banner'
import SwitchTab from './components/SwitchTab'
import LvSelect from './components/LvSelect'
import LvDetail from './components/LvDetail'
import Btn from '@/shared/components/Btn'
import MyProperty from './components/MyProperty'
import Lottery from './components/Lottery'
import Shop from './components/Shop'
import { updateGiftConf } from '@/shared/common/giftConfStore'
import { bingoStorage } from '@/shared/common/gameStorage'
import { hiddenNav } from '@/shared/common/util'

import {
  GetWinnerUnPopupInfo,
  GetUnfinishedRecord,
  GetLvStarConfs,
  GetLotteryInfo,
  GetWebConfig,
  GetShopInfos,
  // GetShopConfs,
  JoinLottery,
  GetLvInfos,
  BuyGood,
  BuyBox,
  GetInfo,
  Start,
  Close
} from '@/shared/common/api'

export default {
  components: {
    SwitchTab,
    LvSelect,
    LvDetail,
    Btn,
    MyProperty,
    Banner,
    Lottery,
    Shop
  },
  data () {
    return {
      index: bingoStorage.get('index') || 0,
      type: bingoStorage.get('type') || 0,
      conf: {},
      userInfo: {},
      selected: {},
      gameInfo: {},
      shopConf: null,
      lotteryInfo: null,
      isGuideDone: !!bingoStorage.get('isGuideDone'),
      shouldShowLottery: true,
      starConf: null
    }
  },
  computed: {
    isReady () {
      return !!this.conf.confs
    }
  },
  created () {
    hiddenNav()
  },
  async mounted () {
    this.eventLaunch()
    this.initUserInfo()
    this.initGiftConf()
    this.initShopConfs()
    this.initLotteryInfo()
    this.initMisserLotteryInfo()
    await this.initStarConf()
    await this.getLvInfos()
    this.sliderTo()
    this.getUnfinishGame(true)
    this.$root.$emit('showDailyTask', 'init')
  },
  // 路由跳转之后，滚动的滚动位置被还原了 这里需要再回滚一下 再查询下库里有咩有游戏获得的免费翻卡次数 有就展示气泡
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // 从其他页面回来的时候 如果已经开奖过了（不在首页开奖的话 shouldShowLottery 的值是 null） 展示上一场的结果
      vm.shouldShowLottery === null && vm.initMisserLotteryInfo()
      vm.shouldShowLottery = true
      vm.sliderTo()
      // const fc = bingoStorage.get('gameFreeCard')
      // fc && vm.$root.$emit('showPopoverStatic', vm.$t('taskSucc', [fc])) && bingoStorage.set('gameFreeCard', 0)
    })
  },
  beforeRouteLeave (to, from, next) {
    // 用户不在首页的时候 开奖不展示弹窗
    this.shouldShowLottery = false
    next()
  },
  methods: {
    /**
     * 工具方法
     */
    goRank () {
      // BINGO榜单页面曝光
      this.$report('bingo_list_pg_show')
      this.$router.push('rank')
    },
    sliderTo () {
      this.$refs.slider && this.$refs.slider.slideTo(this.index)
    },
    // 高级场和普通场的切换
    async typeChange (type) {
      // resetIdx && (this.index = 0)
      this.index = 0
      bingoStorage.set('type', type)
      this.type = type
      await this.getLvInfos()
      this.sliderTo()
    },
    // 更新选择的关卡
    updateSelect (index) {
      // 处理充引导层回退的问题
      index < 0 && (index = 0)
      const target = this.conf.confs[index]
      let status = 0
      if (target.lock) {
        status = 2
      }
      // 如果第一个引导关的 star 不是 0 就是引导没完成
      if (!this.isGuideDone) {
        // const first = this.conf.confs[0]
        console.log('this.isGuideDone', this.isGuideDone, target.lv)
        if (target.lv !== 0) {
          status = 1
        }
      }
      bingoStorage.set('index', index)
      this.index = index
      this.selected = {
        index,
        status,
        ...target
      }
    },
    // 通过 lv 获取配置 因为this.conf.confs是一个数组 所以得这么搞
    getConfByLv (lv) {
      let result = null
      this.conf.confs.forEach((conf, idx) => {
        if (conf.lv === lv) {
          result = conf
          result.index = idx
        }
      })
      return result
    },
    // 挂载事件 不使用 vux 的数据传导策略
    eventLaunch () {
      const gameStartCb = async (cb) => {
        await this.gameStart()
        cb && cb(this.gameInfo)
      }
      // 游戏初始化 透传 gameInfo
      this.$root.$on('gameInit', (cb) => {
        cb && cb(this.gameInfo)
      })
      // 更新等级信息 在游戏完成 bingo 的时候准备返回主页面的时候使用
      this.$root.$on('updateLvInfo', async (cb, isHasLv0) => {
        await this.getLvInfos(isHasLv0)
        cb && cb()
      })
      // 在游戏页面调用更新首页的用户信息
      this.$root.$on('home-updateUserInfo', (userInfo) => {
        this.userInfo = userInfo
      })
      this.$root.$on('home-updateUserInfoByBackend', this.initUserInfo)
      // 重置游戏
      this.$root.$on('gameRestart', async (cb) => {
        await this.closeGame()
        await gameStartCb(cb)
      })
      // 游戏完成继续下关的时候调用 主要是更新 seleted 处理回退时候的定位问题
      this.$root.$on('updateSelectAndPlay', async (i, star, cb) => {
        this.updateSelect(i)
        // 反向更新
        star && (this.selected.star = star)
        await gameStartCb(cb)
      })
      // 星星旁边的【?】气泡内容没有根据等级变化
      this.$root.$on('getStarConf', async (lv, cb) => {
        cb && cb(this.starConf[lv])
      })
    },
    async initGiftConf () {
      const key = 'bingo-game-gift'
      const giftConf = await GetWebConfig({ key })
      updateGiftConf(giftConf[key])
    },
    /**
     * 抽奖逻辑
     */
    async initLotteryInfo () {
      const rsp = await GetLotteryInfo()
      if (rsp.result.errcode === 0) {
        delete rsp.result
        this.lotteryInfo = rsp
      }
    },
    async buyCode (data) {
      const { amount } = data
      // 点击购买抽奖券
      this.$report({ function_id: 'buy_lottry_ticket_click', number: amount })
      const rsp = await JoinLottery({ amount })
      if (rsp.result.errcode === 0) {
        this.$showToast(this.$t('buyCodeSucc', [amount]))
        this.initUserInfo()
        this.lotteryInfo.total_codes += amount
        this.lotteryInfo.my_codes += amount
      }
    },
    async initMisserLotteryInfo () {
      const rsp = await GetWinnerUnPopupInfo()
      if (rsp.result.errcode === 0) {
        this.$root.$emit('showLottery', rsp.info)
      }
    },
    // 开奖逻辑
    drawLottery () {
      this.shouldShowLottery && this.$root.$emit('showLottery', this.lotteryInfo.id)
      this.shouldShowLottery = null
      setTimeout(() => {
        this.initLotteryInfo()
      }, 2500)
    },
    /**
     * 商城逻辑
     */
    async initShopConfs () {
      const rsp = await GetShopInfos()
      if (rsp.result.errcode === 0) {
        delete rsp.result
        rsp.boxes.forEach(box => {
          let rs = []
          this.filterReward(box.rewards, rs)
          box.rewards = rs
        })
        this.shopConf = rsp
      }
    },
    buyShop (id) {
      return {
        box: () => BuyBox({ box_id: id }),
        good: () => BuyGood({ good_id: id })
      }
    },
    async shopBuy (type, id, reward) {
      let isSucc = 0
      let theReward = {}
      const rsp = await this.buyShop(id)[type]()
      if (rsp.result.errcode === 0) {
        this.initShopConfs()
        theReward = rsp.reward || reward
        this.$root.$emit('showExchangeSucc', theReward)
        this.initUserInfo()
        isSucc = 1
      }
      if (type === 'good') {
        // 宝箱点击
        this.$report({ function_id: 'exchange_commodity_click', commodity_type: theReward.reward_id, exchange_result: isSucc })
      } else {
        // 兑换商品点击
        this.$report({ function_id: 'treasure_click', treasure_type: theReward.reward_id, treasure_result: isSucc })
      }
    },
    /**
     * 游戏逻辑
     */
    async gameStart () {
      const rsp = await Start({ bingo_type: this.type, lv: this.selected.lv })
      if (rsp.result.errcode === 0) {
        this.gameInfo = {
          grids: rsp.grids,
          record_id: rsp.record_id,
          reward: this.conf.rewards[this.selected.index],
          ...this.selected,
          flop: this.conf.cost[this.selected.index],
          type: this.type
        }
        bingoStorage.set('gameStartType', this.type)
      }
      return rsp.result
    },
    async startGame () {
      if (this.selected.status !== 0) { return }
      // 点击开始游戏
      this.$report('start_game_click')
      const isUnfinish = await this.getUnfinishGame()
      if (!isUnfinish) {
        const rsp = await this.gameStart()
        if (rsp.errcode === 0) {
          this.$router.push('game')
        }
      }
    },
    async closeGame () {
      const rsp = await Close({ record_id: this.gameInfo.record_id })
      if (rsp.result.errcode === 0) {
        bingoStorage.set('checkBoard', '')
      }
    },
    async initUserInfo () {
      const userInfo = await GetInfo()
      if (userInfo.result.errcode === 0) {
        this.userInfo = { coin: userInfo.coin, ticket: userInfo.ticket }
        // 每次在首页更新用户信息的时候 也更新在游戏页的用户信息
        this.$root.$emit('game-updateUserInfo', this.userInfo)
      }
    },
    updateGameInfo (unfinishGame) {
      // this.updateSelect()
      const selected = this.getConfByLv(unfinishGame.lv)
      this.gameInfo = {
        ...selected,
        grids: unfinishGame.grids,
        record_id: unfinishGame.record_id,
        reward: this.conf.rewards[selected.index],
        lv: unfinishGame.lv,
        grid_infos: unfinishGame.grid_infos,
        flop: this.conf.cost[selected.index],
        type: this.type
      }
      return selected
    },
    async getUnfinishGame (from = false) {
      const unfinishGame = await GetUnfinishedRecord()
      if (unfinishGame.result.errcode === 0) {
        if (unfinishGame.record_id) {
          const gameStartType = bingoStorage.get('gameStartType')
          this.$report({ function_id: 'close_game_reconfirmation_popup_show', status: from ? 0 : 1 })
          // 这里更新是为了关闭游戏
          this.updateGameInfo(unfinishGame)
          this.$root.$emit('showContinue', {
            cont: this.$t('gameTip6', [unfinishGame.lv, gameStartType === 0 ? this.$t('common') : this.$t('advanced')]),
            cancelTxt: from ? this.$t('playLater') : this.$t('closeGame'),
            confirm: async () => {
              if (gameStartType !== this.type) {
                // 切换 tab 之后，select 就别重置了 需要把 select 回滚成未完成局的操作
                await this.typeChange(gameStartType || 0)
              }
              // 再次更新 更新切换 tab 的问题
              this.selected = this.updateGameInfo(unfinishGame)
              this.$router.push('game')
              this.$root.$emit('showContinue', false)
            },
            cancel: async () => {
              if (!from) {
                await this.closeGame()
                this.$showToast(this.$t('closeSucc'))
              }
              this.$report({ function_id: 'close_game_reconfirmation_popup_click', status: from ? 0 : 1 })
            }
          })
          return true
        }
        return false
      }
    },
    /**
     * 配置整合逻辑
     */
    filterReward (data, confRw) {
      let cacheRw = []
      data.forEach(rw => {
        const rid = `${rw.reward_id}-${rw.reward_type}`
        if (cacheRw.indexOf(rid) === -1 && rid !== '0-0') {
          confRw.push(rw)
          cacheRw.push(rid)
        }
      })
    },
    async initStarConf () {
      const rsp = await GetLvStarConfs({ bingo_type: this.type })
      if (rsp.result.errcode === 0) {
        let starConf = {}
        rsp.lv_confs.forEach(sconf => {
          starConf[sconf.lv] = sconf.confs || {}
        })
        this.starConf = Object.freeze(starConf)
      }
    },
    async getLvInfos (isHasLv0) {
      const config = {
        confs: [],
        rewards: [],
        cost: []
      }
      const lvInfo = await GetLvInfos({ bingo_type: this.type })
      console.log('lvInfo', lvInfo)
      if (lvInfo.result.errcode === 0) {
        const firstOne = lvInfo.confs[0]
        if (firstOne.lv === 0 && lvInfo.lv_stars[0]) {
          // 第一个要是是 0 而且已经完成就弹栈
          this.isGuideDone = true
          bingoStorage.set('isGuideDone', true)
          lvInfo.confs.shift()
        }
        lvInfo.confs.forEach((conf, idx) => {
          const lv = conf.lv
          const lvs = lvInfo.lv_stars
          const nowLv = lvs[lv] || 0
          const prevLv = lvs[lv - 1] || 0
          // 获取下一关的限制以便在游戏结束的时候确定是否可以晋级
          const { last_lv_star: conditionNext } = lvInfo.confs[idx + 1] || {}
          // 把钻石搞到数据中
          const confRw = []
          if (conf.coin) { // 插入奖励的代币
            confRw.push({ amount: conf.coin, reward_id: 0, reward_type: 100 })
          }
          this.filterReward(conf.rewards, confRw)
          config.rewards.push(confRw)
          // 奖励处理完毕
          config.confs.push({
            lv,
            // 首位一定是可以玩的
            // lock: idx === 0 && this.isGuideDone ? false : prevLv < conf.last_lv_star,
            lock: false,
            // 引导局默认为 1
            // limit: lv === 0 ? 1 : (this.starConf[lv] && this.starConf[lv][0].star),
            limit: 1,
            star: nowLv,
            condition: conf.last_lv_star,
            conditionNext
          })
          config.cost.push({ coin: conf.flop_coin, ticket: conf.flop_ticket })
        })
        // console.log('config.confs[0]', config)
        this.conf = config
        // fix 用户通过体验关后，点击【继续游戏】，进入LV1，用户点击游戏界面左上角的返回按钮
        this.updateSelect(isHasLv0 ? this.index - 1 : this.index)
      }
    }
  }
}
</script>

<style lang="scss" module>
.container {
  width: 100%;
  font-size: 24px;
  position: relative;
}
.mts {
  margin-top: 60px;
}
.main {
  width: 690px;
  min-height: 605px;
  border: solid 4px #daffe4;
  position: relative;
  margin-top: -90px;
  &0 {
    border-radius: 0px 30px 30px 30px;
    &:lang(ar) {
      border-radius: 30px 0px 30px 30px;
    }
  }
  &1 {
    border-radius: 30px 0px 30px 30px;
    background-image: url('./img/abg.png');
    &:lang(ar) {
      border-radius: 0px 30px 30px 30px;
    }
  }
}
.btn {
  margin-top: -55px;
}
.rank {
  width: 100px;
  height: 100px;
  position: fixed;
  z-index: 9;
  bottom: 15%;
  right: 20px;
  :lang(ar) {
    left: 20px;
  }
}
</style>
