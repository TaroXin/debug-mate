<script setup lang="ts">
import { setPublicKey, useDebugMate } from '@debug-mate/vue'

// 私钥内容
// -----BEGIN PRIVATE KEY-----
// MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDbC29R6UTukKd4
// NZ2/3tCzGEuCfYIVswsKFYdA1iAIN1hLaJ9O7EKZBhtXxqK0O7ttaqUcXyMkNV3K
// LycJS0m9aPZW5h3mCxmxs2kdiJVb7/Rrz8FQmIgJSu8qL6MlunE2rYWLQ8LT56K8
// c3tYaqHSJnUfJnkNV0SWwufCyqom7ocqnAwEnDLvHM37vev6n99g3eKlMl1Y1tf+
// ewvv3dteKWYYYckcojmWQ+W6w7UUWheWbnVoowc1GEWVllpuLiQOBTDonzlhABfc
// 9cIs9P7qna7xpEHLRx/v7LwzKSZSONxW6/VwliXkqwqcg/OnIpZff3aFvj3YFWaG
// bNqozKGBAgMBAAECggEAea/IkAC/Qqkp4CYpFMZ7uoLsr/l5owRsRZXgJazO7sGQ
// U5QzrGykMs6psgGvseDdJtPwFerkYuEi0YeQcCFbPdZpw6zjP0E7bPT2mGmgUArm
// Bl7MTjHuoPr4Er+UKwmAi5eqcMucGIy+Y2LkSyIx88VZm4yMA1VPzVFJ33UnQaiJ
// /k4wgKY3gx4X/KzDRJki/9lCVQi5JJkWVJEN7Cvt+pcj9NFdfbKgeSEXk5Zglu8Q
// SxTuO9BYlT5/yWx8/1U7/MwujInKlqL+mgAFqEyrtugYPRIS1o1J7uv6MVB15xFk
// mzta+VP3akVKQyg5dnKqVSE4Yg5pW9h52mzcapICAQKBgQD6HqbCf1DS2biyagNH
// HpK1i8yzkMkcEVZkuqv+iLRsBsZMedFLLhDbSQy8vyPvskf26lRYt20Q3X4lMshB
// CySbw832e2GQi/GxTKBRmrt2YBig4WpCRBbSG4AuHzcSajdaLYN6GBgIeG033tn2
// 0K1k3yFObprRoghkeIr3lB/4CQKBgQDgMcH+i7dSEU0xCa4LSKRQTSJE3GtnxioH
// DcFsCYvqfGu3fTnnooPhgnl5uhsLb1k8G5ybI9xvd+WUmhHzDYT7Faz+vSvySyUW
// 4HIEkPiI6OH8+59OucH93fH5tLGBtldEFX7Tg9BK/7MTUHZtzMDm+EVPnLAG8Vrg
// SHL3rDoLuQKBgFqD3yuB8Zjsi8edT+Rb7xHeLs1I906+A3reh0HM7SYu6XJhn1lK
// qXUCIabosTOcXCjCMpYMg17YGT+S+h93zd7E5HNvwSYTTvsv1NDTY0X6js8h5Fdo
// 1q1goGmQiFiUscVjtTHpKEFge339mvmUGTvo99+vbT2yGsFpUjk4lL0pAoGAfpta
// 5HbeVdgzcWf4A6NIN5j3q0+W0AnWnhkki/BwNUGCSyLK2oaqV2WpWBbDQxfkms81
// B1+fEsvwuJSxYkLWQD0jbtBByxion1ysxutfj2GEjatDcd/xL35xMgTa4VepvGcv
// Mh+UN2ZjKJsd5i/lGApIigcAWUtfeJ0xX7DBLvECgYA4vxw+Emx1XwrxFAz93LHs
// Vb8QMd4mo/mGkcrBbo5wCIVSQDK9/HJUMu18NYV5wwAzRAiT/GS2UySxP+KlIGgE
// drnVToAG0HQZKS0HWnLHTP9GD1UYO5CzI2l/GFUuTq61+CN/ro+RlcltCkP9PyAC
// Tl/GObtM5cgkuRO07hFlHw==
// -----END PRIVATE KEY-----

setPublicKey(`
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA2wtvUelE7pCneDWdv97Q
sxhLgn2CFbMLChWHQNYgCDdYS2ifTuxCmQYbV8aitDu7bWqlHF8jJDVdyi8nCUtJ
vWj2VuYd5gsZsbNpHYiVW+/0a8/BUJiICUrvKi+jJbpxNq2Fi0PC0+eivHN7WGqh
0iZ1HyZ5DVdElsLnwsqqJu6HKpwMBJwy7xzN+73r+p/fYN3ipTJdWNbX/nsL793b
XilmGGHJHKI5lkPlusO1FFoXlm51aKMHNRhFlZZabi4kDgUw6J85YQAX3PXCLPT+
6p2u8aRBy0cf7+y8MykmUjjcVuv1cJYl5KsKnIPzpyKWX392hb492BVmhmzaqMyh
gQIDAQAB
-----END PUBLIC KEY-----
`)

const { value: showViteIcon } = useDebugMate({
  type: 'boolean',
  name: 'showViteIcon',
  label: '显示Vite图标',
  default: true,
})

const { value: showVueIcon } = useDebugMate({
  type: 'boolean',
  name: 'showVueIcon',
  label: '显示Vue图标',
  default: true,
})

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

const { value: privateString } = useDebugMate({
  type: 'string',
  name: 'privateString',
  label: '我是私有变量',
  default: '私有变量哦',
  private: true,
})
</script>

<template>
  <div>
    <a v-if="showViteIcon" href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo">
    </a>
    <a v-if="showVueIcon" href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo">
    </a>

    <div v-if="showTitle">
      页面标题：{{ titleName }}
    </div>

    <p>
      基础请求地址：{{ baseUrl }}
    </p>

    <p>
      日期：{{ date }}
    </p>

    <p>
      日期时间：{{ datetime }}
    </p>

    <p>
      数字：{{ number }}
    </p>

    <p>
      私有变量：
      {{ privateString }}
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
