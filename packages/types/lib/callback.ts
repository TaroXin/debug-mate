import type { NeedVariableType, TypeMaps } from './need'

export type NeedCallback<T extends NeedVariableType> = (value: TypeMaps<T>) => void
