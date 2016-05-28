'use strict'
const thunk = require('thunks')()
const thunkLoop = require('..')

var i = 0
thunkLoop(function * () {
  yield thunk.delay(1000)
  i = ++i % 60
  console.log(i)
  return true
})(function (_) {
  // will never reach here.
})
