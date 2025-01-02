<script setup lang="ts">
function setValue() {
  chrome.storage.local.set({
    'debug-mate-test': `test${Math.random().toString().slice(2, 6)}`,
  })
}
</script>

<template>
  这里是首页内容
  <n-button @click="setValue">
    设置一个变量
  </n-button>
</template>

<style scoped lang="scss">

</style>
