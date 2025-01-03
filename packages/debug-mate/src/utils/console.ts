/* eslint-disable no-console */

export function loggerError(message: string) {
  console.log(`%c[DebugMate] ${message}`, 'color: red')
}

export function loggerWarn(message: string) {
  console.log(`%c[DebugMate] ${message}`, 'color: orange')
}
