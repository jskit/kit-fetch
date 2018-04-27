// ENV

// 自动判断环境
// const apiEnv = 'dev'

const { location } = window

export const ENV = {
  prod: {
    name: 'prod',
    baseUrl: 'https://m.haoshiqi.net',
    apiBaseUrl: 'https://m.api.haoshiqi.net',
  },
  dev: {
    name: 'dev',
    baseUrl: 'http://m.dev.haoshiqi.net',
    apiBaseUrl: 'http://m.devapi.haoshiqi.net',
  },
  beta: {
    name: 'beta',
    baseUrl: 'https://m.beta.haoshiqi.net',
    apiBaseUrl: 'https://m.betaapi.haoshiqi.net',
  },
  test: {
    name: 'test',
    routerMode: 'hash',
    baseUrl: location.origin, // 当前地址ip 可以取当前 location.origin
    apiBaseUrl: 'http://m.devapi.haoshiqi.net',
  },
  local: {
    name: 'local',
    routerMode: 'hash',
    baseUrl: location.origin, // localhost
    apiBaseUrl: 'http://m.betaapi.haoshiqi.net',
    // apiBaseUrl: 'http://m.api.haoshiqi.net',
  },
}

/*
# nginx

location / {
  index index.html;
  try_files $uri $uri/ /index.html;
}

# 指定v2子目录时
location /v2 {
  alias v2 /data/hsq/v2;
  index index.html;
  try_files $URI $uri/ /v2/index.html;
}
*/
const baseEnv = {
  name: 'prod',
  port: 8001,
  debug: false,
  base: 'v2',
  host: 'https://m.haoshiqi.net',
  apiHost: 'https://m.api.haoshiqi.net',
  routerMode: 'history',
  googleAnalyticsId: 'UA-XXXXX-X',
  baiduAnalyticsId: 'UA-XXXXX-X',
  publicPath: '',
  baseUrl: '',
  apiBaseUrl: '',
}

const regDev = /^(m\.dev\.haoshiqi\.net)/i
const regBeta = /^(m\.beta\.haoshiqi\.net)/i
const regProd = /^(m\.haoshiqi\.net)/i
const regLocal = /^(localhost|127\.)/i
const regLocalIp = /^(10\.|192\.)/i
// const { protocol, host = ENV.prod.host, origin = ENV.prod.baseUrl } = location

export function createEnv(opts = {}) {
  const { env = 'prod' } = opts
  const {
    host = ENV[env].host,
    // origin = ENV[env].baseUrl,
  } = location
  const prodEnv = { ...baseEnv, ...ENV.prod }
  if (host.match(regProd)) {
    return prodEnv
  }
  if (host.match(regDev)) {
    return Object.assign(prodEnv, ENV.dev, ENV.dev)
  }
  if (host.match(regBeta)) {
    return Object.assign(prodEnv, ENV.beta, ENV.beta)
  }

  const isLocal = host.match(regLocal)
  const isLocalIp = host.match(regLocalIp)
  if (isLocal || isLocalIp) {
    return Object.assign(prodEnv, ENV.local, {
      // baseUrl: `${origin}/#`,
      // apiBaseUrl: `${origin}`,
      debug: true,
    })
  }
  // __TEST__
  return Object.assign(prodEnv, ENV.test)
}

const currentEnv = createEnv({
  // env: apiEnv,
})

// 默认会有个 api 配置，之后会读取 store
export default currentEnv
