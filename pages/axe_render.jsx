import { useState, Fragment, useEffect } from "react"
import Nav2 from "../components/nav"
import Footer from "../components/footer"
import { Form, Button } from "react-bootstrap"
import { log } from "util"
import IndexHeader from "../components/index_header"


const AxeRender = () => {

  useEffect(() => {
    const _e = (sel) => document.querySelector(sel)
    const _es = (sel) => document.querySelectorAll(sel)
    const Sliders = () => {
      let width = _e('#id-canvas').clientWidth
      let el = _e('.config')
      el.style.width = width + 'px'
      let t = document.createElement('div')
      let t_inner = ''
      // step 表示每次滑动改变的大小 默认 0.1
      for (let [k, v] of Object.entries(config)) {
          let s = `
              <div>
                  <span>${v.title}</span>
                  <input 
                      class='config-range'
                      type="range" 
                      name="${k}"
                      value="${v.value}"
                      max="${v.max}"
                      min="${v.min}"
                      min="${v.min}"
                      step="${v.step || 0.1}"
                  />
              </div>
          `
          t_inner += s
      }
      t.innerHTML = t_inner
      // console.log(t)
      // console.log(typeof(t))
      el.appendChild(t)
      // console.log(el)
      let range = _es('.config-range')
      range.forEach(item => {
          item.addEventListener('input', e => {
              let k = e.target.name
              config[k].value = e.target.value
          })
      })
    }
    Sliders()
  }, [])

  return (
    <Fragment>
      <IndexHeader title={"AxeRender"} />
      <link href='https://fonts.font.im/css?family=Orbitron' rel='stylesheet' type='text/css' />
      <link rel="stylesheet" href="/render/assets/index.css" />
      <script src='/render/renderer/config.js'></script>
      <script src='/render/renderer/gua_object.js'></script>
      <script src='/render/renderer/utils.js'></script>
      <script src='/render/renderer/vector.js'></script>
      <script src='/render/renderer/color.js'></script>
      <script src='/render/renderer/canvas.js'></script>
      <script src='/render/renderer/vertex.js'></script>
      <script src='/render/renderer/matrix.js'></script>
      <script src='/render/renderer/axemesh.js'></script>
      <script src='/render/renderer/axe_model.js'></script>
      <script src='/render/renderer/chest_image.js'></script>
      <script src='/render/renderer/chest3d.js'></script>
      <script src='/render/renderer/illidan_image.js'></script>
      <script src='/render/renderer/illidan_mesh.js'></script>
      <script src='/render/axe3d/illidan/illidan_gua3d.js'></script>
      <script src='/render/axe3d/ball4_gua3d.js'></script>
      <script src='/render/axe3d/ball10_gua3d.js'></script>
      <script src='/render/axe3d/ball100_gua3d.js'></script>
      <Nav2 />

      <div
        className="d-flex justify-content-center"
        style={{ margin: "0vh 0", backgroundColor: "black", padding: "10vh 0" }}
      >
        <div className="workspace">
          <div className="work">
          {/* dangerouslySetInnerHTML={ testSliders() } */}
            <div className="config"></div>
            <canvas id="id-canvas" width="800" height="600"></canvas>
          </div>
        </div>
      </div>

      <Footer color={"black"} />
      <script src="/render/assets/slider.js"></script>
      <script src="/render/main.js"></script>
    </Fragment>
  )
}

export default AxeRender
