'use strict'
// **Github:** https://github.com/thunks/thunk-loop
//
// **License:** MIT

'use strict'

const thunk = require('thunks')()

module.exports = thunkLoop.loop = thunkLoop

function thunkLoop (iter, errorHandle) {
  errorHandle = errorHandle || nOop
  let handle = (err, res) => err == null ? res : thunk(errorHandle(err))
  return thunk(function *() {
    while (true) {
      let res = yield thunk(iter())(handle)
      if (res !== true) return res
    }
  })
}

function nOop (err) {
  throw err
}
