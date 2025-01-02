import type { NeedCallback, NeedVariableOptions, NeedVariableType, TypeMaps } from '@debug-mate/types'

const valueChangeListeners: Record<string, NeedCallback<any>[]> = {}

export async function need<T extends NeedVariableType>(options: NeedVariableOptions<T>) {
  if (!window.__IS_DEBUG_MATE__) {
    return { value: options.default }
  }

  if (options.onChange) {
    addValueChangeListener<T>(options.name, options.onChange)
  }

  const needEvent = new CustomEvent('debug-mate-need', {
    detail: options,
  })

  return new Promise<{ value: TypeMaps<T> }>((resolve) => {
    window.dispatchEvent(needEvent)
    window.addEventListener('debug-event-need-value', (e: CustomEvent<{ value: TypeMaps<T> }>) => {
      resolve(e.detail)
    })
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
