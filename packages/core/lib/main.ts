import type { NeedCallback, NeedValue, NeedVariableOptions, NeedVariableType } from '@debug-mate/types'
import { dispatchNeedEvent, encodePrivate, listenNeedValueEvent, listenValueChangeEvent } from '@debug-mate/shared'

const valueChangeListeners: Record<string, NeedCallback<any>[]> = {}

const valueNeedListeners: Record<string, (value: NeedValue) => void> = {}

let _publicKey = ''

function needValueListener() {
  listenNeedValueEvent((detail) => {
    valueNeedListeners[detail.name]?.(detail)
    delete valueNeedListeners[detail.name]
  })

  listenValueChangeEvent((detail) => {
    valueChangeListeners[detail.name]?.forEach((callback) => {
      callback?.(detail.value)
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
    let encodeName: string | false = options.name
    if (options.private) {
      if (!_publicKey) {
        console.warn('Please set the public key before using the need function with private variables.')
        resolve({
          value: options.default,
          name: options.name,
        })
        return
      }

      encodeName = encodePrivate(options.name, _publicKey)
      if (!encodeName) {
        console.warn('Encode private variable failed, please check the public key.')
        resolve({
          value: options.default,
          name: options.name,
        })
        return
      }
    }

    dispatchNeedEvent({
      ...options,
      name: options.name,
      encodeName,
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
  _publicKey = publicKey
}

export * from '@debug-mate/types'

export default {
  need,
  addValueChangeListener,
  removeValueChangeListener,
  setPublicKey,
}
