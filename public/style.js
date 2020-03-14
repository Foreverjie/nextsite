const log = console.log.bind(console)

const _main = function() {
  let nav = document.querySelector("nav")
  window.onscroll = function() {
    const scrollTop = document.documentElement.scrollTop
    if (scrollTop > 0) {
      nav.classList.add("scrolled-nav")
    } else {
      nav.classList.remove("scrolled-nav")
    }
  }
}

document.addEventListener("DOMContentLoaded", function() {
  _main()
})
