<template>
  <main id="nuxt-app" class="text-center">
    <slot />
  </main>
</template>

<style lang="scss">
/**
 * 公共css
 */
/* ios超出滚动 */
#nuxt-app {
  width: 100%;
  height: 100%;
  /* overflow-y: auto; */
}
html {
  font-size: 13.33333333vw;
}

@media (min-width: 560px) {
  html {
    font-size: 74.66666666666667px;
  }
}

body {
  font-size: 16px;
}
</style>
