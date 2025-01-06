import { JSEncrypt } from 'jsencrypt'

export function encodePrivate(text: string, publicKey: string) {
  const e = new JSEncrypt()
  e.setPublicKey(publicKey)
  return e.encrypt(text)
}

export function decodePrivate(text: string, privateKey: string) {
  const e = new JSEncrypt()
  e.setPrivateKey(privateKey)
  return e.decrypt(text)
}
