<p align="center">
  <img src="icon_128.png" width="128" alt="Logo">
</p>

<p align="center" style="font-size: 24px; font-weight: bold">
    DebugMate
</p>
<p align="center">
    Debugging Buddy for Developers and Testers
</p>
<p align="center">
  <a href="./README.md">中文</a>
  |
  <a href="./README_EN.md">English</a>
</p>

## Demo

https://github.com/user-attachments/assets/91c4c47d-d055-4a32-95e0-962877018394

## Install

Make sure to install the Chrome browser extension before getting started:  [DebugMate](https://chromewebstore.google.com/detail/debugmate/efbblpnpfoppffekpcpdhpegojfhdihd)

```shell
pnpm add @debug-mate/core
npm i @debug-mate/core
```

If you're using Vue, you can skip the above installation steps and directly install the Vue support library.

```shell
pnpm add @debug-mate/vue
npm i @debug-mate/vue
```

## Use in Javascript

```js
import DebugMate from '@debug-mate/core'

const { value: showFormId } = await DebugMate.need({
    name: 'showFormId',
    label: 'Display Form Id',
    description: 'Displays the form ID on the XXXXX page',
    type: 'boolean',
    default: false,
    /// Is private variable?
    private: true,
    onChange: (value) => {}
});

// Subscription Value Changed
DebugMate.addValueChangeListener('showFormId', (value) => {})
```

## Use in Vue

```ts
const { value: showFormId } = useDebugMate<boolean>({
    name: 'showFormId',
    label: 'Display Form Id',
    description: 'Displays the form ID on the XXXXX page',
    type: 'boolean',
    default: false,
    /// Is private variable?
    private: true,
})
```

## Settings for Making Variables Private

Don’t want other devs messing with your variables? Just make them private! Once they’re locked down, no one can access or tweak them without the private key.

DateMate uses [jsencrypt](https://www.npmjs.com/package/jsencrypt?activeTab=readme) for RSA encryption and decryption. You can obtain the public and private keys from its `README` file or generate them through an online website.

### Use in Javascript
```ts
// 调试参数私有化
import DebugMate from '@debug-mate/core'

DebugMate.setPublicKey(`
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA8Ign5/My3MU3l7ypjRlG
N6eWYu/azK7gjKRcYm4xdlSbA9cF6kmKv1qdf7XO7eFgjOMyW1WoErwCiE4HAx+8
2B4bOnG9ZlDgy0P8NNhCYD5121/fDrQyy882rj4oOKUr4S+bJnagVJj3u+hU6DhE
mh27oI/9yVPWQ2I8j3rYDzrocEvLuyO/yrlaERUahY+pFUoL+fAwnJn3hnAVn1TW
Krzql9yVxUYgUaWis6p9PPS78OY2QEQgASw9fvGzcZbqCW1JYBVr78Hx3u3cLh4M
tGvnhWu7jkv0xLdmZ12Vk6XbcmO59TbRDVhvmust54iV5bSvthjrzHojpmHwcCR9
9QIDAQAB
-----END PUBLIC KEY-----
`)

// 接着你可以在使用过程中进行参数私有化

DebugMate.need({
  // ...,
  private: true,
})
```

### Use in Vue

```ts
import { setPublicKey, useDebugMate } from '@debug-mate/vue'

setPublicKey(``)

useDebugMate({
  // ...,
  private: true,
})
```

## Types of Settings We Support

- string
- email
- url
- boolean
- number
- integer
- date
- time
- datetime
- color
- select
- multiSelect
