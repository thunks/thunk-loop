thunk-loop
====
Asynchronous tasks loop.

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]

## [thunks](https://github.com/thunks/thunks)

## Demo

```js
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
```

## API

```js
const thunkLoop = require('thunk-loop')
```

### thunkLoop(iter[, errorHandle])


[npm-url]: https://npmjs.org/package/thunk-loop
[npm-image]: http://img.shields.io/npm/v/thunk-loop.svg

[travis-url]: https://travis-ci.org/thunks/thunk-loop
[travis-image]: http://img.shields.io/travis/thunks/thunk-loop.svg
