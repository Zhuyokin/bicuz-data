<template>
  <!-- <div ref="svgaPlayer" id="svgaPlayer" style="width: 180px; height: 180px"></div> -->
  <canvas id="svgaCanvas" ref="svgaRef" :style="`width:${svgaConfig.width}px;height:${svgaConfig.height}px;`"></canvas>
</template>

<script setup lang="ts">
import { ref, nextTick, reactive, computed, onMounted, onUnmounted } from 'vue';
import lazyLoading from './lazyLoading';
let svgaPlayer = ref(null);
let svgaParser = ref(null);
let svgaRef = ref(null);
let svgaConfig = ref({
  url: '',
  width: 120,
  height: 120,
  isCacheFrames: true,
});
import { Parser, Player } from 'svga';
let isPlayOnce = ref(false);
// 初始化资源

const initSvga = async (config) => {
  // if (svgaPlayer.value) {
  //   svgaPlayer.clear();
  //   // @SEE https://github.com/svga/SVGAPlayer-Web/issues/93#issuecomment-844755065
  //   svgaPlayer._videoItem = null;
  //   svgaPlayer = null;
  // }
  svgaParser.value = new Parser();
  const svga = await svgaParser.value.load(config.url);
  svgaConfig.value = config;
  svgaPlayer.value = new Player({
    // container: document.getElementById('svgaCanvas'),
    ...svgaConfig.value,
    container: svgaRef?.value,
    loop: config.loop,
  });
  await svgaPlayer.value.mount(svga);
  // 开始播放动画
  svgaPlayer.value.start();
  svgaPlayer.value.onStart = () => console.log('onStart');
  svgaPlayer.value.onResume = () => console.log('onResume');
  svgaPlayer.value.onPause = () => console.log('onPause');
  svgaPlayer.value.onStop = () => console.log('onStop');
  // svgaPlayer.value.onProcess = () => console.log('onProcess', svgaPlayer.value.progress);
  svgaPlayer.value.onEnd = () => console.log('onEnd');
};

const setSvgaConfig = async (config) => {
  if (svgaPlayer.value) {
    svgaPlayer.value.clear();
    // @SEE https://github.com/svga/SVGAPlayer-Web/issues/93#issuecomment-844755065
  }
  console.log("setSvgaConfig > ==",config)
  if (isPlayOnce.value && config.loop == 1) return;
  if (config.loop == 1) {
    isPlayOnce.value = true;
  } else {
    isPlayOnce.value = false;
  }
  // initSvga(config);
  const svga = await svgaParser.value.load(config.url);
  svgaPlayer.value.setConfig({
    loop: config.loop,
  })
  await svgaPlayer.value.mount(svga);
  svgaPlayer.value.start();
  svgaPlayer.value.onEnd = () => {
    isPlayOnce.value = false;
    if(config?.playEnd){
      config?.playEnd()
    }
    console.log('onEnd')
  }
};

onUnmounted(()=>{
  if(svgaPlayer.value){
    svgaPlayer.value.destroy();
    svgaParser.value.destroy();
  }
})

defineExpose<{
  initSvga: (config: Object) => void;
  setSvgaConfig: (config: Object) => void;
}>({ initSvga, setSvgaConfig });
</script>
