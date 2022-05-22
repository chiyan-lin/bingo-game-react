<template>
  <transition name="modal">
    <div class="modal" @click.self="close">
      <div class="modal__wrap greImgdBg">
        <slot></slot>
        <span class="modal__close" @click.stop="close"></span>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'modal',
  data () {
    return {
      scrollTop: 0
    }
  },
  mounted () {
    // 在弹出层显示之前，记录当前的滚动位置
    this.scrollTop = this.getScrollTop()

    // todo: check 使body脱离文档流
    document.body.classList.add('no-scroll')

    // 把脱离文档流的body拉上去！否则页面会回到顶部！
    document.body.style.top = `${-this.scrollTop}px`
  },
  destroyed () {
    // body又回到了文档流中（我胡汉三又回来啦！）
    document.body.classList.remove('no-scroll')

    // 滚回到老地方！
    this.toScrollTop(this.scrollTop)
  },
  methods: {
    close () {
      this.$emit('close')
    },
    toScrollTop (scrollTop) {
      document.body.scrollTop = scrollTop
      document.documentElement.scrollTop = scrollTop
    },
    getScrollTop () {
      return document.body.scrollTop || document.documentElement.scrollTop
    }
  }
}
</script>

<style lang="scss">

.modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1000;
  background: rgba(#000, 0.5);
  transition: opacity .3s ease;

  &__wrap {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1001;
    background-color: #009975;
    width: 600px;
    border: solid 4px #daffe4;
    border-radius: 20px;
  }

  &__close {
    width: 25px;
    height: 25px;
    background-image: url('./img/close.png');
    background-size: contain;
    background-repeat: no-repeat;
    position: absolute;
    top: 24px;
    right: 26px;
    z-index: 999;
  }

  &-enter, &-leave-to {
    opacity: 0;
  }

  &-leave-active, &-enter-active {
    transition: opacity .3s;
  }
}

</style>
