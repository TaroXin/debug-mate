<script setup lang="ts">
import { useDebugMate } from '@debug-mate/vue'

const { value: showTitle } = useDebugMate({
  type: 'boolean',
  name: 'showTitle',
  label: '显示标题',
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
  label: '基础请求地址',
  default: 'http://',
  description: '路由的请求路径，设置以后原本的路径无效',
  onChange: (value) => {
    console.warn('值改变了', value)
  },
})

const { value: date } = useDebugMate({
  type: 'date',
  name: 'date',
  label: '日期',
  default: Date.now(),
})

const { value: datetime } = useDebugMate({
  type: 'datetime',
  name: 'datetime',
  label: '日期时间',
  default: Date.now(),
})

const { value: number } = useDebugMate({
  type: 'number',
  name: 'number',
  label: '数字',
  default: 100,
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

    <p>
      {{ baseUrl }}
    </p>

    <p>
      {{ date }}
    </p>

    <p>
      {{ datetime }}
    </p>

    <p>
      {{ number }}
    </p>
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
