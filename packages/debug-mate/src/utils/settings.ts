export async function getCurrentOrigin(): Promise<string | undefined> {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs?.[0]?.url) {
        resolve(URL.parse(tabs[0].url)?.origin)
      }
    })
  })
}
