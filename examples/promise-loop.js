'use strict'

const thunkLoop = require('..')

var i = 1000
thunkLoop(function () {
  if (--i) return Promise.resolve(true)
  return Promise.resolve('OK')
})(function (err, res) {
  console.log(err, res, i) // null, 'OK', 0
})
