import type { NeedVariableOptions } from '@debug-mate/types'
import { EVENT_NEED, EVENT_NEED_VALUE, EVENT_VALUE_CHANGE } from './keys'

export function dispatchNeedEvent(options: NeedVariableOptions) {
  const event = new CustomEvent(EVENT_NEED, {
    detail: options,
  })
  window.dispatchEvent(event)
}

export function dispatchNeedValueEvent(name: string, value: any) {
  const event = new CustomEvent(EVENT_NEED_VALUE, {
    detail: {
      name,
      value,
    },
  })
  window.dispatchEvent(event)
}

export function dispatchValueChangeEvent(name: string, value: any) {
  const event = new CustomEvent(EVENT_VALUE_CHANGE, {
    detail: {
      name,
      value,
    },
  })
  window.dispatchEvent(event)
}
