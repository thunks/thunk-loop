const thunkLoop = require('..')

var i = 1000
thunkLoop(function () {
  if (--i) throw new Error('test')
  return 'OK'
}, function (err) {
  console.log(err.message)
  return true
})(function (err, res) {
  console.log(err, res, i) // null, 'OK', 0
})

// thunkLoop(function () {
//   if (--i) throw new Error('test')
//   return 'OK'
// }, function (err) {
//   console.log(err.message) // 'test'
//   throw new Error('errorHandle error')
// })(function (err, res) {
//   console.log(err, res, i) // null, 'OK', 0
// })
