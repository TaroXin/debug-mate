import type { NeedValue } from './callback'
import type { NeedVariableOptions } from './need'

export * from './callback'
export * from './need'

declare global {
  interface Window {
    __IS_DEBUG_MATE__: boolean
  }

  interface WindowEventMap {
    'debug-mate-need': CustomEvent<NeedVariableOptions>
    'debug-mate-need-value': CustomEvent<NeedValue>
    'debug-mate-value-change': CustomEvent<NeedValue>
  }
}
