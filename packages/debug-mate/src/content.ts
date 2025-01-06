import type { NeedVariableOptions } from '@debug-mate/types'
import { dispatchNeedValueEvent, dispatchValueChangeEvent, listenNeedEvent } from '@debug-mate/shared'
import { loggerWarn } from './utils/console.ts'

function getCurrentOrigin(): string {
  return encodeURIComponent(window.location.origin)
}

export function getConfigKey(name: string, origin: string) {
  return `${origin}:${name}:config`
}

export function getValueKey(name: string, origin: string) {
  return `${origin}:${name}:value`
}

export function getEnableKey(origin: string) {
  return `${origin}:enable`
}

function injectScript() {
  const script = document.createElement('script')
  script.src = chrome.runtime.getURL('inject.js')
  ;(document.head || document.documentElement).appendChild(script)
}

function addNeedListener() {
  listenNeedEvent(async (options) => {
    if (!options?.type || !options?.name) {
      loggerWarn('need event type or name is empty')
      return
    }
    // 获取当前页面的路径，作为当前网站的唯一标识
    const currentOrigin = getCurrentOrigin()
    // 存储变量的配置
    const key = getConfigKey(options.name, currentOrigin)
    const valueKey = getValueKey(options.name, currentOrigin)
    const enableKey = getEnableKey(currentOrigin)
    chrome.storage.local.get([key, valueKey, enableKey], (result) => {
      /**
       * 如果存在这个配置，那么需要更新配置
       * 但是存在以下规则
       *   1. 如果有已有配置
       *     1.1. 如果已存在的配置和现有配置的 type 字段不一样，那么其值设置为默认值，原因是类型的改变会导致以前设置的值可能不匹配
       *     1.2. 更新已配置的值的其他选项
       *   2. 如果没有已有配置，那么直接存储这个配置
       *   3. 返回设置的值
       *     3.1 判断总开关是否开启，开启正常返回
       *     3.2 如果总开关关闭，那么返回 default
       */
      if (result[key]) {
        // 1.1
        if ((result[key] as NeedVariableOptions).type !== options.type) {
          chrome.storage.local.set({
            [valueKey]: options.default,
          })
        }
        // 1.2
        chrome.storage.local.set({
          [key]: {
            ...result[key],
            ...options,
          },
        })
      }
      else {
        chrome.storage.local.set({
          [key]: options,
          [valueKey]: options.default,
        })
      }

      dispatchNeedValueEvent(
        options.name,
        result[valueKey] == null || result[enableKey] === false ? options.default : result[valueKey],
      )
    })
  })
}

function addStorageChangeListener() {
  chrome.storage.local.onChanged.addListener(async (changes) => {
    // 发布 valueChange 事件
    const currentOrigin = getCurrentOrigin()

    // 如果全局选项没有开启，则直接只响应 default 值，不关心设置的值
    const enableKey = getEnableKey(currentOrigin)
    const enabledRes = await chrome.storage.local.get(enableKey)
    const isOriginEnable = enabledRes[enableKey] !== false

    for (const key of Object.keys(changes)) {
      if (key.startsWith(`${currentOrigin}:`) && key.endsWith(':value') && changes[key].oldValue !== undefined) {
        const name = key.split(':')[1]
        let newValue = changes[key].newValue
        // 如何设置为 null, 或者全局选项未开启， 就返回默认值
        if (newValue == null || !isOriginEnable) {
          const configKey = getConfigKey(name, currentOrigin)
          const result = await chrome.storage.local.get(configKey)
          newValue = result[configKey]?.default
        }

        dispatchValueChangeEvent(
          decodeURIComponent(name),
          newValue,
        )
      }
    }
  })
}

function initialize() {
  injectScript()

  addNeedListener()
  addStorageChangeListener()
}

initialize()
