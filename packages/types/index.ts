// interface TypeMaps {
//   string: string
//   email: string
//   url: string
//   wsUrl: string
//   json: string
//   number: number
//   integer: number
//   float: number
//   boolean: boolean
//   date: Date
//   time: Date
//   datetime: Date
//   color: string
// }

export type NeedsVariableType =
  | 'string'
  | 'email'
  | 'url'
  | 'wsUrl'
  | 'json'
  | 'number'
  | 'integer'
  | 'float'
  | 'boolean'
  | 'date'
  | 'time'
  | 'datetime'
  | 'color'

export interface NeedVariableOptions {
  /**
   * The name of the variable.
   *
   * 当前变量的名称
   */
  name: string

  type: NeedsVariableType

  /**
   * The label displayed for the variable in the DateMate plugin.
   * which defaults to the name attribute that is set.
   *
   * 显示在 DateMate 插件中的变量标题，
   * 默认为 name 属性。
   */
  label?: string

  /**
   * The description displayed for the variable in the DateMate plugin.
   *
   * 显示在 DateMate 插件中的变量描述。
   */
  description?: string

  /**
   * The default value of the variable.
   *
   * 变量的默认值。
   *
   * 这里的类型不应该是 any，而是根据 type 属性来确定。
   * 但是这个类型声明我不会写！
   */
  default?: any

  /**
   * Is it a private variable?
   *
   * Private variables need to be configured with a public key to take effect.
   * Please refer to the documentation for configuration details.
   *
   * 是否是私有变量
   *
   * 私有变量需要配置公钥才能生效，请参考文档进行配置。
   *
   * @example
   * ```ts
   * import DebugMate from '@debug-mate/core'
   *
   * DebugMate.setPublicKey('XXX')
   * ```
   */
  private?: boolean

  /**
   * Callback function when the variable value changes.
   *
   * 变量值改变时的回调函数。
   *
   * 这里的 value 类型也不应该是 any，而是根据 type 属性来确定。
   */
  onChange?: (value: any) => void

}

export const options: NeedVariableOptions = {
  name: 'name',
  type: 'json',
  label: 'label',
  description: 'description',
  default: '111',
  private: true,
}
