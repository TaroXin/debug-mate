import type { NeedCallback, NeedsVariableType, NeedVariableOptions } from '@debug-mate/types'

const valueChangeListeners: Record<string, NeedCallback<any>[]> = {}

export function need<T extends NeedsVariableType>(options: NeedVariableOptions<T>) {
  if (options.onChange) {
    addValueChangeListener<T>(options.name, options.onChange)
  }
  return options
}

export function addValueChangeListener<T extends NeedsVariableType>(key: string, callback: NeedCallback<T>) {
  valueChangeListeners[key] = valueChangeListeners[key] || []
  valueChangeListeners[key].push(callback)
}

export function removeValueChangeListener<T extends NeedsVariableType>(key: string, callback: NeedCallback<T>) {
  if (valueChangeListeners[key]) {
    valueChangeListeners[key] = valueChangeListeners[key].filter(
      listener => listener !== callback,
    )
  }
}

export function setPublicKey(publicKey: string) {
  return publicKey
}

export default {
  need,
  addValueChangeListener,
  removeValueChangeListener,
  setPublicKey,
}
