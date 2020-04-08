// https://juejin.im/post/5e8bec156fb9a03c4d40f4bc

var PENDING = 'pending'
var FULFILLED = 'fulfilled'
var REJECTED = 'rejected'

function MyPromise(fn) {
  this.status = PENDING
  this.value = null
  this.reason = null

  this.onFulfilledCallbacks = []
  this.onRejectedCallbacks = []

  var self = this

  function resolve(value) {
    if (self.status === PENDING) {
      self.status = FULFILLED
      self.value = value
      self.onFulfilledCallbacks.forEach(function (callback) {
        callback(self.value)
      })
    }
  }

  function reject(reason) {
    if (self.status === PENDING) {
      self.status = REJECTED
      self.reason = reason
      self.onRejectedCallbacks.forEach(function (callback) {
        callback(self.reason)
      })
    }
  }

  try {
    fn(resolve, reject)
  } catch (error) {
    reject(error)
  }
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
  var realOnFulfilled = onFulfilled
  if (typeof realOnFulfilled !== 'function') {
    realOnFulfilled = function (value) {
      return value
    }
  }

  var realOnRejected = onRejected
  if (typeof realOnRejected !== 'function') {
    realOnRejected = function (reason) {
      throw reason
    }
  }

  if (this.status === FULFILLED) {
    onFulfilled(this.value)
  }
  if (this.status === REJECTED) {
    onRejected(this.reason)
  }
  if (this.status === PENDING) {
    this.onFulfilledCallbacks.push(realOnFulfilled)
    this.onRejectedCallbacks.push(realOnRejected)
  }
}