// 播放对象实例
export const playerInstances = []

// 保存webview当前的状态
export let isWebViewPause = false

// 只初始化一次
let flag = false

// 是否使用自动暂停功能
export let autoPause = false

// 初始化监听
export function initLinsten (hagoAppCall) {
  autoPause = true
  if (!flag) {
    flag = true
    hagoAppCall.on('onWebViewLifecycle', arg => {
      let _isWebViewPause = false
      if (arg === 'onPause') {
        _isWebViewPause = true
      }
      if (arg === 'onResume') {
        _isWebViewPause = false
      }
      if (_isWebViewPause !== isWebViewPause) {
        isWebViewPause = _isWebViewPause
        handlePlayer()
      }
    })
  }
}

// 新增播放实例
export function addPlayer (player) {
  playerInstances.push(player)
  if (isWebViewPause) {
    handlePlayer()
  }
}

// 处理播放实例
export function handlePlayer () {
  playerInstances.filter(player => player._renderer).forEach(player => {
    // eslint-disable-next-line no-debugger
    // debugger
    if (isWebViewPause) {
    // 暂停
      // player.tmpStatus = player._animator.mRunning
      player.tmpStatus && player.pause()
    } else {
    // 播放
      player.tmpStatus && player.start()
    }
  })
}

// 测试方法
export function testChangeWebView (_isWebViewPause) {
  if (isWebViewPause !== _isWebViewPause) {
    isWebViewPause = _isWebViewPause
    handlePlayer()
  }
}
