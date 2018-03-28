
// https://www.npmjs.com/package/benchmark

const assert = require('assert')
const suite = new (require('benchmark')).Suite
const recurse = require('../lib/recurse')
const tail = require('../lib/tail')
const iter = require('../lib/iter')

/* eslint new-parens: 0 */
// const suite = new Suite

/* eslint func-names: 0 */
suite
  .add('recurse', function () { recurse(20) })
  .add('tail', function () { tail(20) })
  .add('iter', function () { iter(20) })
  .on('complete', function () {
    console.log('result: ')
    // console.log(this)
    this.forEach(function (result) {
      console.log(result.name, result.count, result.times.elapsed)
    })
    assert.equal(
      this.filter('fastest').map('name'),
      'iter',
      'expect iter to be the fastest'
    )
  })
  .run()
