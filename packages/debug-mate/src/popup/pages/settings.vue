<script setup lang="ts">
import { getOriginPrivateKey, setOriginPrivateKey } from '@/utils/settings.ts'

const privateKey = ref('')
const saveLoading = ref(false)

async function initialConfigs() {
  privateKey.value = await getOriginPrivateKey()
}

async function saveConfigs() {
  saveLoading.value = true
  await setOriginPrivateKey(privateKey.value)
  saveLoading.value = false
}

initialConfigs()
</script>

<template>
  <n-form label-placement="left" label-width="80px" label-align="left">
    <n-form-item label="RSA 私钥">
      <n-input
        v-model:value="privateKey"
        type="textarea"
        :rows="4"
        placeholder="请复制 RSA 私钥内容到这里，私钥内容用于显示私有变量项"
      />
    </n-form-item>

    <n-form-item label=" ">
      <n-button
        type="primary"
        secondary
        :loading="saveLoading"
        @click="saveConfigs"
      >
        保存设置
      </n-button>
    </n-form-item>
  </n-form>
</template>

<style scoped lang="scss">

</style>
