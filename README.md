<p align="center">
  <img src="icon.png" width="100" alt="Logo">
</p>

<p align="center" style="font-size: 30px; font-weight: bold">
    DebugMate
</p>
<p align="center">
    面向开发人员与测试人员的调试伙伴
</p>

```ts
// 调试参数私有化
import DebugMate from '@debug-mate/core'

// 公私钥设计，页面设置公钥，在插件上传私钥
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
```

普通JS中使用

```js
import DebugMate from '@debug-mate/core'

const { value: showFormId, setValue } = DebugMate.need({
    name: 'showFormId',
    title: '是否显示表单ID',
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

Vue 使用
```ts
const { value: showFormId, setValue } = useDebugMate<boolean>({
    name: 'showFormId',
    title: '是否显示表单ID',
    description: '用于在XXXXX页面显示其表单ID',
    type: 'boolean',
    default: false,
    /// 是否启用私有化
    private: true,
})
```

