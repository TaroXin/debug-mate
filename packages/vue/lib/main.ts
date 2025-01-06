import type { NeedVariableOptions, NeedVariableType, TypeMaps } from '@debug-mate/types'

import { addValueChangeListener, setPublicKey as coreSetPublicKey, need } from '@debug-mate/core'
import { ref } from 'vue-demi'

export function useDebugMate<T extends NeedVariableType>(options: NeedVariableOptions<T>) {
  const value = ref<TypeMaps<T> | undefined>()

  need(options).then((result) => {
    value.value = result.value as TypeMaps<T>
  })

  addValueChangeListener(options.name, (result) => {
    value.value = result as TypeMaps<T>
  })

  return {
    value,
  }
}

export function setPublicKey(publicKey: string) {
  coreSetPublicKey(publicKey)
}
