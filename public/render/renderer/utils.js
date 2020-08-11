const log = console.log.bind(console)

const _e = (sel) => document.querySelector(sel)

const _es = (sel) => document.querySelectorAll(sel)

const interpolate = (a, b, factor) => a + (b - a) * factor

const random01 = () => Math.random()

const appendHtml = function (element, html) {
  element.insertAdjacentHTML('beforeend', html)
}

const bindEvent = function (element, eventName, callback) {
  element.addEventListener(eventName, callback)
}

const bindAll = function (sel, eventName, callback) {
  var l = _es(sel)
  for (var i = 0; i < l.length; i++) {
    var input = l[i]
    input.addEventListener(eventName, function (event) {
      callback(event)
    })
  }
}

const lightAngle = function (light, v1, v2, v3) {
  let normal = GuaVector.core(v1.normal, v2.normal, v3.normal)
  let core = GuaVector.core(v1.position, v2.position, v3.position)
  let lightVector = light.sub(core)
  // log(core, lightVector)

  // 夹角
  let cosValue = (normal.dot(lightVector)) / (normal.length() * lightVector.length())
  // log(cosValue)
  return cosValue
}