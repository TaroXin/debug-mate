import type { NeedVariableType, TypeMaps } from './need'

export type NeedCallback<T extends NeedVariableType> = (value: TypeMaps<T>) => void

export interface NeedValue<T extends NeedVariableType = NeedVariableType> {
  name: string
  value?: TypeMaps<T>
}
