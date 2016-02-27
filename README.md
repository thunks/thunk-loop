thunk-loop
====
Asynchronous tasks loop (while (true) { ... }).

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]

## [thunks](https://github.com/thunks/thunks)

## Demo
**Infinite Clock:**
```js
const thunk = require('thunks')()
const thunkLoop = require('..')

var i = 0
thunkLoop(function *() {
  yield thunk.delay(1000)
  i = ++i % 60
  console.log(i)
  return true
})(function (_) {
  // will never reach here.
})
```

## API

```js
const thunkLoop = require('thunk-loop')
```

### thunkLoop(iter[, errorHandle])

return thunk function. You should run the thunk function because of thunk's lazy evaluation. If iter is infinite, you will not get the last result except error occured.

- `iter`: {Function}, it is your task loop, can be sync or async task. If `iter`'s result is `true`, the loop will continue, otherwise the loop will terminate.

  **Sync function:**
  ```js
  var i = 1000
  thunkLoop(function () {
    if (--i) return true
    return 'OK'
  })(function (err, res) {
    console.log(err, res, i) // null, 'OK', 0
  })
  ```

  **Promise:**
  ```js
  var i = 1000
  thunkLoop(function () {
    if (--i) return Promise.resolve(true)
    return Promise.resolve('OK')
  })(function (err, res) {
    console.log(err, res, i) // null, 'OK', 0
  })
  ```

  **Generator function:**
  ```js
  var i = 1000
  thunkLoop(function *() {
    // yield thunk or promise
    if (--i) return yield thunk(true)
    return yield Promise.resolve('OK')
  })(function (err, res) {
    console.log(err, res, i) // null, 'OK', 0
  })
  ```

- `errorHandle`: {Function}, it is optional, can be sync or async function. It is used to catch the exception from `iter`.

  If `errorHandle` omit. the exception from `iter` will terminate loop:
  ```js
  thunkLoop(function *() {
    throw new Error('error!')
  })(function (err, res) {
    console.log(err.message, ) 'error!'
  })
  ```

  If `errorHandle` return `true`. the exception from `iter` will ignore and loop will continue:
  ```js
  var i = 1000
  thunkLoop(function () {
    if (--i) throw new Error('test')
    return 'OK'
  }, function (err) {
    console.log(err.message) // 'test'
    return true
  })(function (err, res) {
    console.log(err, res, i) // null, 'OK', 0
  })
  ```

  If `errorHandle` throw error:
  ```js
  var i = 1000
  thunkLoop(function () {
    if (--i) throw new Error('test')
    return 'OK'
  }, function (err) {
    console.log(err.message) // 'test'
    throw new Error('errorHandle error')
  })(function (err, res) {
    console.log(err.message, i) // 'errorHandle error', 999
  })
  ```

[npm-url]: https://npmjs.org/package/thunk-loop
[npm-image]: http://img.shields.io/npm/v/thunk-loop.svg

[travis-url]: https://travis-ci.org/thunks/thunk-loop
[travis-image]: http://img.shields.io/travis/thunks/thunk-loop.svg
