<script setup lang="ts">
import type { NeedVariableWithValue } from '@debug-mate/types'
import type { DatePickerType } from 'naive-ui/es/date-picker/src/config'
import { getCurrentOrigin, getOriginEnabled, getValueKey, getVariableConfig, setOriginEnabled } from '@/utils/settings.ts'

const configs = ref<NeedVariableWithValue[]>([])
const saveLoading = ref(false)
const enabled = ref(false)

async function initialConfigs() {
  configs.value = await getVariableConfig()
  enabled.value = await getOriginEnabled()
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

async function handleEnabledChanged(v: boolean) {
  await setOriginEnabled(v)
}

initialConfigs()
</script>

<template>
  <n-form
    label-placement="left"
    label-width="100px"
    label-align="left"
    class="max-w-80%"
  >
    <n-form-item label="启用配置">
      <n-switch v-model:value="enabled" @change="handleEnabledChanged" />
    </n-form-item>
    <n-divider style="margin-top: 0">
      <div flex="~ items-center gap-10" class="text-14 opacity-50">
        <div i-icon-park-outline-arrow-down />
        <div>页面变量</div>
        <div i-icon-park-outline-arrow-down />
      </div>
    </n-divider>

    <n-empty v-if="configs.length === 0" description="暂无页面变量" />

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
    <n-form-item v-if="configs.length > 0" label=" ">
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
