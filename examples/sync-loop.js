const thunkLoop = require('..')

var i = 1000
thunkLoop(function () {
  if (--i) return true
  return 'OK'
})(function (err, res) {
  console.log(err, res, i) // null, 'OK', 0
})
