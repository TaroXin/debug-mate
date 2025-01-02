import type { NeedVariableOptions, NeedVariableType } from './need'

export * from './callback'
export * from './need'

declare global {
  interface Window {
    __IS_DEBUG_MATE__: boolean
  }

  interface WindowEventMap {
    'debug-mate-need': CustomEvent<NeedVariableOptions<NeedVariableType>>
    'debug-mate-need-value': CustomEvent<{ value: any }>
    'debug-mate-value-change': CustomEvent<{ key: string, value: any }>
  }
}
