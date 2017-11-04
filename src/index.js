import fetch from './fetch'
import { merge } from 'lodash'
import request from './request'

const defaults = {}

export {
  fetch,
}
export default request

export class Request {
  constructor(instanceConfig) {
    this.setting(instanceConfig)
  }

  setting(opts) {
    // 这个会改变 defaults 的值吗
    this.defaults = merge({}, defaults, this.defaults, { method: 'get' }, opts)
  }

  getConfig() {
    return this.defaults
  }


}
