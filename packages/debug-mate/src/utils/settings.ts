import type { NeedVariableWithValue } from '@debug-mate/types'
import { getConfigKey, getEnableKey, getPrivateKey, getValueKey, STORAGE_CONFIG_APPEND } from '@debug-mate/shared'

export async function getCurrentOrigin(): Promise<string | undefined> {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs?.[0]?.url) {
        resolve(URL.parse(tabs[0].url)?.origin ?? '')
      }
    })
  })
}

export async function getOriginEnabled() {
  const origin = encodeURIComponent(await getCurrentOrigin() ?? '')
  const enableKey = getEnableKey(origin)
  return chrome.storage.local.get(enableKey).then(v => v[enableKey] ?? true)
}

export async function setOriginEnabled(enabled: boolean) {
  const origin = encodeURIComponent(await getCurrentOrigin() ?? '')
  const enableKey = getEnableKey(origin)
  return chrome.storage.local.set({ [enableKey]: enabled })
}

export async function getOriginPrivateKey() {
  const origin = encodeURIComponent(await getCurrentOrigin() ?? '')
  const key = getPrivateKey(origin)
  return chrome.storage.local.get(key).then(v => v[key])
}

export async function setOriginPrivateKey(privateKey: string) {
  const origin = encodeURIComponent(await getCurrentOrigin() ?? '')
  const key = getPrivateKey(origin)
  return chrome.storage.local.set({ [key]: privateKey })
}

export async function getVariableConfig(): Promise<NeedVariableWithValue[]> {
  const origin = encodeURIComponent(await getCurrentOrigin() ?? '')
  const keys = await chrome.storage.local.getKeys()
  const variableNames = keys.filter(key =>
    key.startsWith(`${origin}:`) && key.endsWith(STORAGE_CONFIG_APPEND)).map(k => k.split(':')[1],
  )

  const result = await chrome.storage.local.get(
    variableNames.map(k => [getConfigKey(k, origin), getValueKey(k, origin)]).flat(),
  )

  const configs: NeedVariableWithValue[] = []

  for (const name of variableNames) {
    const c = {
      ...result[getConfigKey(name, origin)],
      value: result[getValueKey(name, origin)],
    }
    configs.push(c)
  }

  configs.sort((a, b) => a.sort ?? 0 - (b.sort ?? 0))

  return configs
}
