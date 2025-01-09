<p align="center">
  <img src="icon_128.png" width="128" alt="Logo">
</p>

<p align="center" style="font-size: 24px; font-weight: bold">
    DebugMate
</p>
<p align="center">
    面向开发人员与测试人员的调试伙伴
</p>
<p align="center">
  <a href="./README.md">中文</a>
  |
  <a href="./README_EN.md">English</a>
</p>

## 安装

```shell
pnpm add @debug-mate/core
npm i @debug-mate/core
```

如果使用 Vue，你可以忽略上面的安装，直接安装 Vue 的支持库

```shell
pnpm add @debug-mate/vue
npm i @debug-mate/vue
```

## Javascript 中使用

```js
import DebugMate from '@debug-mate/core'

const { value: showFormId } = await DebugMate.need({
    name: 'showFormId',
    label: '是否显示表单ID',
    description: '用于在XXXXX页面显示其表单ID',
    type: 'boolean',
    default: false,
    /// 是否启用私有化
    private: true,
    // 直接使用字段订阅值
    onChange: (value) => {}
});

// 订阅值改变
DebugMate.addValueChangeListener('showFormId', (value) => {})
```

## Vue 使用
```ts
const { value: showFormId } = useDebugMate<boolean>({
    name: 'showFormId',
    label: '是否显示表单ID',
    description: '用于在XXXXX页面显示其表单ID',
    type: 'boolean',
    default: false,
    /// 是否启用私有化
    private: true,
})
```

## 变量的私有化设置

我们如果不希望自己的变量被其他开发者获取，可以设置私有化，私有化后，其他开发者在无页面私钥的情况下，无法获取变量以及设置变量！

DateMate 使用 [jsencrypt](https://www.npmjs.com/package/jsencrypt?activeTab=readme) 实现 RSA 加密解密，你可以根据其`README`文件获取公私钥，或者通过在线网站生成

### Javascript 使用
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

### Vue 中使用

```ts
import { setPublicKey, useDebugMate } from '@debug-mate/vue'

setPublicKey(``)

useDebugMate({
  // ...,
  private: true,
})
```

## 支持的设置类型

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

## 工作原理

DebugMate 使用了Chrome插件的 `storage` 来存储调试参数，同时使用了 `window.dispatchEvent` 来实时推送调试参数的变化，这样在调试过程中，开发者以及测试人员可以在不修改源码的情况下，实时改变调试参数，从而达到相应的目的。

- 调用 need 函数
  - 先判断有没有安装插件，通过设置的特殊值 `window.__IS_DEBUG_MATE__`
    - 如果没有安装插件，则直接返回默认值
  - `@debug-mate/core` 中会调用 `window.dispatchEvent` 来触发插件的监听事件，并注册回调函数
  - 插件的 `content.js` 中会监听事件，并调用 `chrome.storage.local` 来存储调试参数
  - 插件的 `content.js` 中会监听 `chrome.storage.local.onChange` 来监听调试参数的变化，并调用回调函数
  - 回调参数包含独立注册的 `addValueChagneListener` 以及 `onChange` 函数
- 调用 setPublicKey 函数
  - 会缓存公钥内容，在插件中会通过 `jsencrypt` 来加密解密调试参数
- Vue 支持库
  - Vue 支持其实是帮你注册了 `DebugMate.need` 以及 `addValueChangeListener` 函数
  - 所以如果你需要其他支持(如 `React`，`Angular` 等)，也可以采用类型的做法
