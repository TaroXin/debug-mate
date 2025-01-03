import type { NeedCallback, NeedValue, NeedVariableOptions, NeedVariableType, TypeMaps } from '@debug-mate/types'
import { dispatchNeedEvent } from '@debug-mate/shared'

const valueChangeListeners: Record<string, ((value: TypeMaps<any>) => void)[]> = {}

const valueNeedListeners: Record<string, (value: NeedValue) => void> = {}

function needValueListener() {
  window.addEventListener('debug-mate-need-value', (e: CustomEvent<NeedValue>) => {
    valueNeedListeners[e.detail.name]?.(e.detail)
    delete valueNeedListeners[e.detail.name]
  })

  window.addEventListener('debug-mate-value-change', (e: CustomEvent<NeedValue>) => {
    valueChangeListeners[e.detail.name]?.forEach((callback) => {
      callback?.(e.detail.value)
    })
  })
}

needValueListener()

export async function need<T extends NeedVariableType>(options: NeedVariableOptions<T>) {
  if (!window.__IS_DEBUG_MATE__) {
    return {
      value: options.default,
      name: options.name,
    }
  }

  if (options.onChange) {
    addValueChangeListener<T>(options.name, options.onChange)
  }

  return new Promise<NeedValue>((resolve) => {
    dispatchNeedEvent({
      ...options,
      onChange: undefined,
    })
    valueNeedListeners[options.name] = resolve
  })
}

export function addValueChangeListener<T extends NeedVariableType>(key: string, callback: NeedCallback<T>) {
  valueChangeListeners[key] = valueChangeListeners[key] || []
  valueChangeListeners[key].push(callback)
}

export function removeValueChangeListener<T extends NeedVariableType>(key: string, callback: NeedCallback<T>) {
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
