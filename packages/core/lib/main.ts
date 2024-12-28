import type { NeedVariableOptions } from '@debug-mate/types'

export function need(options: NeedVariableOptions) {
  return options
}

export function addValueChangeListener(name: string, callback: (value: any) => void) {
  return name + callback
}

export function setPublicKey(publicKey: string) {
  return publicKey
}

export default {
  need,
  addValueChangeListener,
  setPublicKey,
}
