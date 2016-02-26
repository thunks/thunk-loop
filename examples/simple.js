'use strict'

const thunk = require('thunks')()
const thunkLoop = require('..')

var count = 10
thunkLoop(function *() {
  yield thunk.delay(1000)
  if (!--count) throw new Error('End!')
  console.log(': ' + count)
  return true
})(function (err, res) {
  console.log(err, res)
})
