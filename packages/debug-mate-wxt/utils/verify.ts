export function verifyUrl(url: string) {
  // eslint-disable-next-line regexp/no-unused-capturing-group
  return /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{1,64})?\.)+[a-z]{2,6}\/?/.test(url)
}

export function verifyEmail(email: string) {
  // eslint-disable-next-line regexp/no-unused-capturing-group
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/i.test(email)
}
