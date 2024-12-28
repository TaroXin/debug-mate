import type { NeedVariableOptions } from '@debug-mate/types'
import { need } from '@debug-mate/core'

export function useDebugMate(options: NeedVariableOptions) {
  return need(options)
}
