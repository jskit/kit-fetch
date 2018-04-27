import { stringify } from 'qs'
import _request from '../request'
import mini from '../mini'
import env from './env'
// import { modelApis, commonParams } from './model'
// import { version } from '../package.json'

const debug = false

let apiBaseUrl
apiBaseUrl = `${env.apiBaseUrl}`
if (__DEV__ && debug) {
  const proxyUrl = '' // '/proxy'
  apiBaseUrl = `${env.apiBaseUrl}${proxyUrl}`

  const testApi = {
    getIndexNew: 'mock/index1',
  }
  Object.assign(modelApis, testApi)
}
const regHttp = /^https?/i
const regMock = /^mock?/i

function compact(obj) {
  for (const key in obj) {
    if (!obj[key]) {
      delete obj[key]
    }
  }
  return obj
}

function request(url, options, success, fail) {
  const originUrl = regHttp.test(url) ? url : `${apiBaseUrl}${url}`
  return _request(originUrl, compact(options), success, fail)
}

/**
 * API 命名规则
 * - 使用 camelCase 命名格式（小驼峰命名）
 * - 命名尽量对应 RESTful 风格，`${动作}${资源}`
 * - 假数据增加 fake 前缀
 * - 便捷易用大于规则，程序是给人看的
 */

import { version } from '../../package.json'

// api 列表
const modelApis = {
  test: 'https://easy-mock.com/mock/5aa79bf26701e17a67bde1d7/',
  // 初始化配置
  getConfig: '/common/initconfig',
  getWxSign: '/common/getwxsign',
  // 首页
  getIndex: '/common/index',
  // 获取七牛 token
  getQiniuToken: '/common/qiniutoken',
  // 登录注销
  login: 'POST /user/login',
  logout: 'POST /user/logout',
}

// 公共参数
const commonParams = {
  uuid: '', // 用户唯一标志
  udid: '', // 设备唯一标志
  device: '', // 设备
  net: '', // 网络
  uid: '',
  token: '',
  timestamp: '', // 时间
  channel: 'h5', // 渠道
  spm: 'h5',
  v: version, // 系统版本
  terminal: 'wap', // 终端
  swidth: '', // 屏幕宽度
  sheight: '', // 屏幕高度
  location: '', // 地理位置
  zoneId: 857, // 必须
}

// console.log(Object.keys(modelApis))

const apiList = Object.keys(modelApis).reduce((api, key) => {
  const val = modelApis[key]
  const [url, methodType = 'GET'] = val.split(/\s+/).reverse()
  const method = methodType.toUpperCase()
  // let originUrl = regHttp.test(url) ? url : `${env.apiBaseUrl}${url}`;
  // NOTE: headers 在此处设置？
  if (__DEV__ && regMock.test(url)) {
    api[key] = function postRequest(params, success, fail) {
      const res = require(`../${url}.json`)
      mini.hideLoading()
      res.errno === 0 ? success(res) : fail(res)
    }
    return api
  }
  switch (method) {
    case 'POST':
      // originUrl = `${originUrl}`;
      api[key] = function postRequest(params, success, fail) {
        return request(url, {
          headers: {
            // Accept: 'application/json',
            // 我们的 post 请求，使用的这个，不是 application/json
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          method,
          data: compact(Object.assign({}, getCommonParams(), params)),
        }, success, fail)
      }
      break
    case 'GET':
    default:
      api[key] = function getRequest(params, success, fail) {
        params = compact(Object.assign({}, getCommonParams(), params))
        let query = stringify(params)
        if (query) query = `?${query}`
        return request(`${url}${query}`, {}, success, fail)
      }
      break
  }
  return api
}, {})

export function setCommonParams(params) {
  return Object.assign(commonParams, params)
}

export function getCommonParams() {
  return { ...commonParams }
}

apiList.getCommonParams = getCommonParams
apiList.setCommonParams = setCommonParams

// console.log(apiList)

export default apiList
