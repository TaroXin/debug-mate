<script setup lang="ts">
import type { NeedVariableWithValue } from '@debug-mate/types'
import type { DatePickerType } from 'naive-ui/es/date-picker/src/config'
import { getCurrentOrigin, getValueKey, getVariableConfig } from '@/utils/settings.ts'

const configs = ref<NeedVariableWithValue[]>([])
const saveLoading = ref(false)

async function getConfigs() {
  configs.value = await getVariableConfig()
}

async function saveChange() {
  saveLoading.value = true
  // 只保存值
  const origin = encodeURIComponent(await getCurrentOrigin() ?? '')
  const changes: Record<string, any> = {}
  configs.value.forEach((config) => {
    changes[getValueKey(config.name, origin)] = config.value === '' ? null : config.value
  })
  await chrome.storage.local.set(changes)
  saveLoading.value = false
}

getConfigs()
</script>

<template>
  <n-form
    label-placement="left"
    label-width="100px"
    label-align="left"
    class="max-w-80%"
  >
    <n-form-item v-for="config in configs" :key="config.name" :label="config.label || config.name">
      <template v-if="['string', 'url', 'wsUrl', 'email'].includes(config.type)">
        <n-input :value="config.value as string" clearable @update:value="(value) => (config.value = value)" />
      </template>
      <template v-else-if="['boolean'].includes(config.type)">
        <n-switch :value="config.value as boolean" @update:value="(value) => (config.value = value)" />
      </template>
      <template v-else-if="['number', 'integer'].includes(config.type)">
        <n-input-number :value="config.value as number" @update:value="(value) => (config.value = value)" />
      </template>
      <template v-else-if="['date', 'datetime', 'time'].includes(config.type)">
        <n-date-picker :value="config.value as number" :type="config.type as DatePickerType" @update:value="(value) => (config.value = value)" />
      </template>
      <n-tooltip v-if="config.description" trigger="hover" placement="bottom">
        <template #trigger>
          <div
            i-icon-park-outline-help
            m-l-15
            inline-block
            text-22
            opacity-50
          />
        </template>
        {{ config.description }}
      </n-tooltip>
    </n-form-item>
    <n-form-item label=" ">
      <n-button
        type="primary"
        secondary
        :loading="saveLoading"
        @click="saveChange"
      >
        保存设置
      </n-button>
    </n-form-item>
  </n-form>
</template>

<style scoped lang="scss">

</style>
