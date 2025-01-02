import { listenNeedEvent } from '@debug-mate/shared'
import { loggerError } from './utils/console.ts'

loggerError('<-- Debug Mate -->')

function injectScript() {
  const script = document.createElement('script')
  script.src = chrome.runtime.getURL('inject.js')
  ;(document.head || document.documentElement).appendChild(script)
}

function addNeedListener() {
  // window.addEventListener('debug-event-need', (e: CustomEvent<NeedVariableOptions<NeedVariableType>>) => {
  //   // 获取相应的变量
  //   chrome.storage.local.get(e.detail.name, (value) => {
  //     window.dispatchEvent(
  //       new CustomEvent(
  //         'debug-event-need-value',
  //         {
  //           detail: value[e.detail.name],
  //         },
  //       ),
  //     )
  //   })
  // })
  listenNeedEvent((options) => {
    console.warn('收到了具体的事件', options)
  })
}

function addStorageChangeListener() {
  chrome.storage.local.onChanged.addListener((changes) => {
    // 发布 valueChange 事件
    console.warn(changes)
  })
}

function initialExistVariable() {
  //
}

function initialize() {
  injectScript()

  initialExistVariable()
  addNeedListener()
  addStorageChangeListener()
}

initialize()
