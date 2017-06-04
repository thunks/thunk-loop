'use strict'

const thunkLoop = require('..')
const thunk = require('thunks')()

var i = 1000
thunkLoop(function * () {
  // yield thunk or promise
  if (--i) return yield thunk(true)
  return yield Promise.resolve('OK')
})(function (err, res) {
  console.log(err, res, i) // null, 'OK', 0
})
