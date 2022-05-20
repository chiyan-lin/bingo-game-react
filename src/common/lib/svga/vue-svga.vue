<template>
  <canvas ref='svga'></canvas>
</template>

<script>
import { Player, Downloader, Parser } from 'svga.lite'
import { addPlayer, autoPause, isWebViewPause } from './utils'

const downloader = new Downloader()
const parser = new Parser({ disableWorker: true })

export default {
  props: {
    url: {
      type: String,
      default: ''
    },
    isPause: {
      type: Boolean,
      default: false
    },
    options: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      player: null
    }
  },
  watch: {
    url (val, oldVal) {
      if (val) {
        this.parseSvga(val)
      } else {
        this.player.clear()
      }
    },
    isPause (val, oldVal) {
      if (val) {
        this.player.tmpStatus = false
      } else {
        this.player.tmpStatus = true
      }
      if (!autoPause || !isWebViewPause) {
        if (val) {
          this.player.pause()
        } else {
          this.player.start()
        }
      }
    }
  },
  mounted () {
    if (this.url) {
      this.parseSvga(this.url)
    }
  },
  beforeDestroy () {
    parser.destroy()
    this.player && this.player.destroy()
  },
  methods: {
    // 加载解析svga文件
    async parseSvga (url) {
      try {
        const fileData = await downloader.get(this.url)
        const svgaData = await parser.do(fileData)

        if (!this.player) {
          this.player = new Player(this.$refs.svga)
          autoPause && addPlayer(this.player)
          this.eventListen()
        }

        this.player.set(this.options)
        await this.player.mount(svgaData)

        if ((autoPause && isWebViewPause) || this.isPause) return
        this.player.start()
        this.player.tmpStatus = true
      } catch (error) {
        console.log(error)
      }
    },
    eventListen () {
      this.player.$on('start', () => {
        this.$emit('onStart')
      })
      this.player.$on('process', () => {
        this.$emit('onProcess', this.player.progress)
      })
      this.player.$on('pause', () => {
        this.$emit('onPause')
      })
      this.player.$on('end', () => {
        this.player.tmpStatus = false
        this.$emit('onEnd')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
