
// dva/fetch 即 isomorphic-fetch
// import fetch from 'dva/fetch'

// 低版本支持需要，如 IE
// require('es6-promise').polyfill()

// 客户端使用 whatwg-fetch
// 服务端使用 node-fetch
// "browser": "fetch-npm-browserify.js",
// "main": "fetch-npm-node.js",

module.exports = require('isomorphic-fetch');
