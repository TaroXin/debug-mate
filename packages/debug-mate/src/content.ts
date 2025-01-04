import type { NeedVariableOptions } from '@debug-mate/types'
import { dispatchNeedValueEvent, dispatchValueChangeEvent, listenNeedEvent } from '@debug-mate/shared'
import { loggerWarn } from './utils/console.ts'

function getCurrentOrigin(): string {
  return encodeURIComponent(window.location.origin)
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
    const key = `${currentOrigin}:${options.name}:config`
    const valueKey = `${currentOrigin}:${options.name}:value`
    chrome.storage.local.get([key, valueKey], (result) => {
      /**
       * 如果存在这个配置，那么需要更新配置
       * 但是存在以下规则
       *   1. 如果有已有配置
       *     1.1. 如果已存在的配置和现有配置的 type 字段不一样，那么其值设置为无效
       *     1.2. 更新已配置的值的其他选项
       *   2. 如果没有已有配置，那么直接存储这个配置
       *
       * 如果存在值，则返回值，否则返回 default
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

      dispatchNeedValueEvent(options.name, result[valueKey] == null ? options.default : result[valueKey])
    })
  })
}

function addStorageChangeListener() {
  chrome.storage.local.onChanged.addListener((changes) => {
    // 发布 valueChange 事件
    const currentOrigin = getCurrentOrigin()
    Object.keys(changes).forEach((key) => {
      if (key.startsWith(`${currentOrigin}:`) && key.endsWith(':value') && changes[key].oldValue !== undefined) {
        const name = key.split(':')[1]
        dispatchValueChangeEvent(
          decodeURIComponent(name),
          changes[key].newValue,
        )
      }
    })
  })
}

function initialize() {
  injectScript()

  addNeedListener()
  addStorageChangeListener()
}

initialize()
