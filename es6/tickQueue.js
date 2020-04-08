const log = console.log.bind(console)

const _main = function () {
  let num = 0
  let start = Date.now()
  setInterval(function () {
    num++
    let now = Date.now()
    log('time1', num, now - start)
    if (num > 10) {
      throw Error('timeout!')
    }
  }, 1000)

  setTimeout(function () {
    num++
    let now = Date.now()
    log('time2', num, now - start)
  }, 0)
}

_main()