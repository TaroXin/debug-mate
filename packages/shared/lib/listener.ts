import type { NeedVariableOptions } from '@debug-mate/types'
import { EVENT_NEED } from './keys'

export function listenNeedEvent(callback?: (options: NeedVariableOptions) => void) {
  window.addEventListener(EVENT_NEED, (e: CustomEvent<NeedVariableOptions>) => {
    callback?.(e.detail)
  })
}

export function listenNeedValueEvent() {}

export function listenValueChangeEvent() {}
