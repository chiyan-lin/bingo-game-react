import VueSvga from './vue-svga'
import { initLinsten } from './utils'

function install (Vue, options = {}) {
  if (install.installed) {
    return
  }
  install.installed = true
  if (options.autoPause && !options.hagoAppCall) {
    throw new Error('设置自动暂停svga功能，必须传入hagoAppCall实例')
  }
  options.autoPause && initLinsten(options.hagoAppCall)
  Vue.component('vue-svga', VueSvga)
  Vue.component('VueSvga', VueSvga)
}

export default {
  install
}

export { VueSvga as VueSvgaComponent }
