<template>
  <div>
    <anim-player :conf="config" @ready="onReady" />
    <div class="text-center p-50px">
      <van-space align="center" size="20px">
        <van-button type="warning" block @click="onSwitch">切换动效</van-button>
        <van-button type="primary" block @click="onPause">暂停</van-button>
        <van-button type="success" block @click="onPlayer">播放</van-button>
      </van-space>
    </div>
  </div>
</template>

<script setup lang="ts">
import lottieUrl from './lottie.json?url'
import lottieUrl2 from './lottie2.json?url'
import pagUrl from './like.pag?url'
import pagUrl2 from './music.pag?url'
import svgaUrl from './dragon.svga?url'
import svgaUrl2 from './angel.svga?url'
import vapUrl from './vap.mp4?url'
import vapJson from './vap.json'

let mPlayer = null
// 动效配置
const config = ref<any>({
  // pag资源测试
  // url: pagUrl,
  // lottie资源测试
  url: lottieUrl,
  // svga资源测试
  // url: svgaUrl,
  // vap资源测试
  // url: vapUrl,
  // json: vapJson,
  loop: true,
  useType: 2,
})

// 初始化完成
const onReady = (player) => {
  mPlayer = player.player;
  console.log('[ mPlayer ] >', mPlayer)
  if(mPlayer.play) {
    mPlayer.play()
  } else if(mPlayer.start) {
    mPlayer.start()
  }
}

// 切换动效
const onSwitch = () => {
  // 切换成pag动效
  // config.value.url = pagUrl
  // config.value.url = pagUrl2

  // 切换成lottie动效
  // config.value.url = lottieUrl
  config.value.url = lottieUrl2

  // 切换成svga动效
  // config.value.url = svgaUrl
  // config.value.url = svgaUrl2

  // 切换成vap动效
  // config.value.url = vapUrl
  // config.value.json = vapJson
}

// 暂停
const onPause = () => {
  console.log('[ 暂停 ] >', mPlayer)
  mPlayer?.pause()
}

// 播放
const onPlayer = () => {
  console.log('[ 播放 ] >', mPlayer)
  mPlayer?.play()
}
</script>
