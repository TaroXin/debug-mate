import type { NeedVariableWithValue } from '@debug-mate/types'

export async function getCurrentOrigin(): Promise<string | undefined> {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs?.[0]?.url) {
        resolve(URL.parse(tabs[0].url)?.origin ?? '')
      }
    })
  })
}

export function getConfigKey(name: string, origin: string) {
  return `${origin}:${name}:config`
}

export function getValueKey(name: string, origin: string) {
  return `${origin}:${name}:value`
}

export async function getVariableConfig(): Promise<NeedVariableWithValue[]> {
  const origin = encodeURIComponent(await getCurrentOrigin() ?? '')
  const keys = await chrome.storage.local.getKeys()
  const variableNames = keys.filter(key =>
    key.startsWith(`${origin}:`) && key.endsWith(':config')).map(k => k.split(':')[1],
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

  return configs
}
