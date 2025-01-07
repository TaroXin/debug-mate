import { STORAGE_CONFIG_APPEND, STORAGE_ENABLE_APPEND, STORAGE_PRIVATE_KEY_APPEND, STORAGE_VALUE_APPEND } from './keys'

function isEncoded(url: string) {
  // 检查 URL 中是否包含未编码的特殊字符
  const regex = /[^\w\-.~%]/
  return !regex.test(url)
}

function encodeUrl(url: string) {
  return isEncoded(url) ? url : encodeURIComponent(url)
}

export function getConfigKey(name: string, origin: string) {
  return `${encodeUrl(origin)}:${encodeUrl(name)}${STORAGE_CONFIG_APPEND}`
}

export function getValueKey(name: string, origin: string) {
  return `${encodeUrl(origin)}:${encodeUrl(name)}${STORAGE_VALUE_APPEND}`
}

export function getEnableKey(origin: string) {
  return `${encodeUrl(origin)}${STORAGE_ENABLE_APPEND}`
}

export function getPrivateKey(origin: string) {
  return `${encodeUrl(origin)}${STORAGE_PRIVATE_KEY_APPEND}`
}
