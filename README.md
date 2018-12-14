# kit-request

[![Greenkeeper badge](https://badges.greenkeeper.io/jskit/kit-request.svg)](https://greenkeeper.io/)

封装数据请求，fetch 底层使用 isomorphic-fetch，xhr 底层使用 axios

## 用法

```js
// use fetch(isomorphic-fetch)
import fetch from 'kit-request/fetch'

// use xhr(axios)
import xhr from 'kit-request/xhr'

// use request(Not completed)
import Request from 'kit-fetch'
const request = new Request({
  // config...
})
```
