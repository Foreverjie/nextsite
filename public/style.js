const log = console.log.bind(console)

const navToggle = function() {
  let nav = document.querySelector("nav")
  let navbar = document.querySelector(".nav-bar")
  let burger = document.querySelector("#burger")
  let burgerLine = document.querySelectorAll("#burger div")
  window.onscroll = function() {
    const scrollTop = document.documentElement.scrollTop
    if (scrollTop > 0) {
      nav.classList.add("scrolled-nav")
      burgerLine.forEach(function(b) {
        b.style.backgroundColor = "black"
      })
    } else {
      nav.classList.remove("scrolled-nav")
      burgerLine.forEach(function(b) {
        b.style.backgroundColor = "white"
      })
    }
  }
  burger.addEventListener("click", function() {
    log("burger click")
    navbar.classList.toggle("nav-bar-active")
    burger.classList.toggle("toggle")
  })
}

const _main = function() {
  log("scripts loaded")
  navToggle()
}

document.addEventListener("DOMContentLoaded", function() {
  _main()
})
