<script setup lang="ts">
import type { NeedVariableWithValue } from '@debug-mate/types'
import type { FormInst, FormRules } from 'naive-ui'
import type { DatePickerType } from 'naive-ui/es/date-picker/src/config'
import { useSystemStore } from '@/store/system.ts'
import {
  getConfigKey,
  getOriginEnabled,
  getValueKey,
  getVariableConfig,
  setOriginEnabled,
} from '@/utils/settings.ts'
import { verifyEmail, verifyUrl } from '@/utils/verify.ts'

const systemStore = useSystemStore()
const configs = ref<NeedVariableWithValue[]>([])
const saveLoading = ref(false)
const enabled = ref(false)

const variableForm = ref<FormInst>()
const configRules = ref<FormRules>({})

async function initialConfigs() {
  configs.value = await getVariableConfig()
  enabled.value = await getOriginEnabled()

  configs.value.forEach((config) => {
    configRules.value[config.name] = {
      trigger: ['blur', 'change'],
      validator: (_rule, value) => {
        return verifyVariable(config)
      },
    }
  })
}

function verifyVariable(config: NeedVariableWithValue): boolean | Error {
  if (config.value) {
    switch (config.type) {
      case 'url':
        return verifyUrl(config.value as string) ? true : new Error('请输入正确的 URL')
      case 'email':
        return verifyEmail(config.value as string) ? true : new Error('请输入正确的 Email')
    }
  }
  return true
}

async function saveChange() {
  await variableForm.value?.validate()

  saveLoading.value = true
  // 只保存值
  const changes: Record<string, any> = {}
  configs.value.forEach((config) => {
    changes[getValueKey(config.name, systemStore.encodedOrigin)] = config.value === '' ? null : config.value
  })
  await chrome.storage.local.set(changes)
  saveLoading.value = false
}

async function handleEnabledChanged(v: boolean) {
  await setOriginEnabled(v)
}

async function handleRemove(config: NeedVariableWithValue) {
  await chrome.storage.local.remove([
    getValueKey(config.name, systemStore.encodedOrigin),
    getConfigKey(config.name, systemStore.encodedOrigin),
  ])
  configs.value = configs.value.filter(c => c.name !== config.name)
}

initialConfigs()
</script>

<template>
  <n-form
    ref="variableForm"
    label-placement="left"
    label-width="100px"
    label-align="left"
    class="max-w-80%"
    :rules="configRules"
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

    <n-form-item
      v-for="config in configs"
      :key="config.name"
      :label="config.label || config.name"
      class="group"
      :path="config.name"
    >
      <template v-if="['string', 'url', 'email'].includes(config.type)">
        <n-input v-model:value="config.value as string" clearable />
      </template>
      <template v-else-if="['boolean'].includes(config.type)">
        <n-switch v-model:value="config.value as boolean" />
      </template>
      <template v-else-if="['number', 'integer'].includes(config.type)">
        <n-input-number v-model:value="config.value as number" clearable />
      </template>
      <template v-else-if="['date', 'datetime', 'time'].includes(config.type)">
        <n-date-picker v-model:value="config.value as number" :type="config.type as DatePickerType" clearable />
      </template>
      <div m-l-15 flex="~ items-center gap-10">
        <n-tooltip v-if="config.description" trigger="hover" placement="bottom">
          <template #trigger>
            <div
              i-icon-park-outline-help
              inline-block
              text-22
              text-gray-500
            />
          </template>
          {{ config.description }}
        </n-tooltip>
        <n-popconfirm
          positive-text="确定"
          :positive-button-props="{ type: 'error', secondary: true }"
          :negative-button-props="{ secondary: true }"
          :show-icon="false"
          @positive-click="handleRemove(config)"
        >
          <template #trigger>
            <div
              i-icon-park-outline-delete
              cursor-pointer
              text-20
              text-gray-500
              class="opacity-0 transition-opacity hover:text-[var(--error-color)] group-hover:opacity-100"
            />
          </template>
          确定要删除该变量吗？
        </n-popconfirm>
      </div>
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
