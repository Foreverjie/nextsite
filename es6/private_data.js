const log = console.log.bind(console)

function foo() {
  let name = Symbol()
  let o = {}
  o[name] = '111'
  return o
}

function bar() {
  // let name = Symbol()
  let o = {}
  o['name'] = '111'
  return o
}

let f = foo()
let b = bar()
log(f.name) // undefined
log(b.name) // '111'

const [name] = Object.getOwnPropertySymbols(f)
log(f[name]) // '111'