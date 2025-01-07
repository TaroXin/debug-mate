import type { NeedValue, NeedVariableOptionsInner } from '@debug-mate/types'
import { EVENT_NEED, EVENT_NEED_VALUE, EVENT_VALUE_CHANGE } from './keys'

export function listenNeedEvent(callback?: (options: NeedVariableOptionsInner) => void) {
  window.addEventListener(EVENT_NEED, (e: CustomEvent<NeedVariableOptionsInner>) => {
    callback?.(e.detail)
  })
}

export function listenNeedValueEvent(callback?: (detail: NeedValue) => void) {
  window.addEventListener(EVENT_NEED_VALUE, (e: CustomEvent<NeedValue>) => {
    callback?.(e.detail)
  })
}

export function listenValueChangeEvent(callback?: (detail: NeedValue) => void) {
  window.addEventListener(EVENT_VALUE_CHANGE, (e: CustomEvent<NeedValue>) => {
    callback?.(e.detail)
  })
}
