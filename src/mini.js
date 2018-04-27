
import {
  Toast,
  Indicator,
  MessageBox,
} from 'mint-ui'

export default {
  goLogin() {
    console.log('跳转到登录页面')
  },
  showToast: Toast,
  showLoading: (opts = {}) => {
    let op = {}
    if (typeof opts === 'string') {
      op = {
        content: opts,
      }
    }
    // type = fading-circle snake triple-bounce double-bounce
    op = Object.assign({
      text: op.content || '',
      spinnerType: opts.type || 'fading-circle',
    })

    Indicator.open(compact(op))
  },
  hideLoading: (times = 0) => {
    setTimeout(() => Indicator.close(), times)
  },
  showAlert: MessageBox.alert,
  showConfirm: MessageBox.confirm,
}
