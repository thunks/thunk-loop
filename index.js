'use strict'
// **Github:** https://github.com/thunks/thunk-loop
//
// **License:** MIT

'use strict'

const thunk = require('thunks')()

module.exports = thunkLoop.loop = thunkLoop

function thunkLoop (iter, errorHandle) {
  errorHandle = errorHandle || nOop

  return thunk(function * () {
    while (true) {
      let res = null
      try {
        res = yield iter()
      } catch (err) {
        res = yield errorHandle(err)
      }
      if (res !== true) return res
    }
  })
}

function nOop (err) { throw err }
