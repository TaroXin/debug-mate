import type { NeedsVariableType, TypeMaps } from './need'

export type NeedCallback<T extends NeedsVariableType> = (value: TypeMaps<T>) => void
