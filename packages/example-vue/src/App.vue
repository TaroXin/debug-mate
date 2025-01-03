<script setup lang="ts">
import { useDebugMate } from '@debug-mate/vue'

const { value: showTitle } = useDebugMate({
  type: 'boolean',
  name: 'showTitle',
  default: true,
})

const { value: titleName } = useDebugMate({
  type: 'string',
  name: 'titleName',
  default: '这里是网站Title',
})

const { value: baseUrl } = useDebugMate({
  type: 'url',
  name: 'baseUrl',
  default: 'http://',
  onChange: (value) => {
    console.warn('值改变了', value)
  },
})
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo">
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo">
    </a>

    <div v-if="showTitle">
      {{ titleName }}
    </div>

    {{ baseUrl }}
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
