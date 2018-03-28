
// import { expect } from 'chai';
import assert from 'assert'
import { transform } from 'babel-core'
// import * as babel from 'babel-core';
import { describe, it } from 'mocha'

const transformCode = (str) => {
  return transform(str, {
    comments: true,
    plugins: [
      ['./src', {
        miniType: 'aliapp', // wxapp
      }],
    ],
  }).code
}

describe('Plugin', () => {
  describe('Mini', () => {
    it('test', () => {
      // 清除注释，删除文件底部换行
      const code = `
// 保留注释
import { Button } from 'antd'
`
      const target = `
// 保留注释
import Button from 'antd/lib/button';`
      const result = transformCode(code)
      // console.log(result)
      // expect(result).to.equal(target)
      assert.equal(result, target)
    })
  })
})
