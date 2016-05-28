'use strict'
// **Github:** https://github.com/thunks/thunk-loop
//
// **License:** MIT

const tman = require('tman')
const assert = require('assert')
const thunk = require('thunks')()
const Loop = require('..')

tman.suite('thunk-loop', function () {
  this.timeout(5000)

  tman.it('sync loop', function * () {
    let i = 1000
    let res = yield Loop(function () {
      if (--i) return true
      return 'OK'
    })
    assert.strictEqual(i, 0)
    assert.strictEqual(res, 'OK')
  })

  tman.it('async loop with promise', function * () {
    let i = 1000
    let res = yield Loop(function () {
      return new Promise((resolve, reject) => {
        if (--i) resolve(true)
        else resolve('OK')
      })
    })
    assert.strictEqual(i, 0)
    assert.strictEqual(res, 'OK')
  })

  tman.it('async loop with thunk function', function * () {
    let i = 1000
    let res = yield Loop(function () {
      return (done) => {
        if (--i) done(null, true)
        else done(null, 'OK')
      }
    })
    assert.strictEqual(i, 0)
    assert.strictEqual(res, 'OK')
  })

  tman.it('async loop with generator function', function * () {
    let i = 1000
    let res = yield Loop(function * () {
      yield thunk.delay(1)
      if (--i) return true
      return 'OK'
    })
    assert.strictEqual(i, 0)
    assert.strictEqual(res, 'OK')
  })

  tman.it('should throw error if no errorHandel', function * () {
    let i = 1000
    let res = ''
    try {
      res = yield Loop(function * () {
        yield thunk.delay(1)
        if (--i) throw new Error('test')
        return 'OK'
      })
    } catch (err) {
      assert.strictEqual(err.message, 'test')
      res = 'ERR'
    }

    assert.strictEqual(i, 999)
    assert.strictEqual(res, 'ERR')
  })

  tman.it('should continue if sync error and errorHandel return true', function * () {
    let i = 1000
    let res = yield Loop(function () {
      if (--i) throw new Error('test')
      return 'OK'
    }, function (err) {
      assert.strictEqual(err.message, 'test')
      return true
    })
    assert.strictEqual(i, 0)
    assert.strictEqual(res, 'OK')
  })

  tman.it('should continue if error and errorHandel return true', function * () {
    let i = 1000
    let res = yield Loop(function * () {
      yield thunk.delay(1)
      if (--i) throw new Error('test')
      return 'OK'
    }, function (err) {
      assert.strictEqual(err.message, 'test')
      return true
    })
    assert.strictEqual(i, 0)
    assert.strictEqual(res, 'OK')
  })

  tman.it('should return errorHandel\' result if error', function * () {
    let i = 1000
    let res = yield Loop(function * () {
      yield thunk.delay(1)
      if (--i) throw new Error('test')
      return 'OK'
    }, function (err) {
      assert.strictEqual(err.message, 'test')
      return 'ERR'
    })
    assert.strictEqual(i, 999)
    assert.strictEqual(res, 'ERR')
  })

  tman.it('should catch errorHandel\' error', function * () {
    let i = 1000
    let res = yield Loop(function () {
      if (--i) throw new Error('test')
      return 'OK'
    }, function (err) {
      assert.strictEqual(err.message, 'test')
      throw new Error('errorHandel')
    })(function (err) {
      return err.message
    })

    assert.strictEqual(res, 'errorHandel')
  })

  tman.it('errorHandel support async...', function * () {
    let i = 1000
    let res = yield Loop(function * () {
      yield thunk.delay(1)
      if (--i) throw new Error('test')
      return 'OK'
    }, function * (err) {
      yield thunk.delay(1)
      assert.strictEqual(err.message, 'test')
      return 'ERR'
    })
    assert.strictEqual(i, 999)
    assert.strictEqual(res, 'ERR')
  })
})
