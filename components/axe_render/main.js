let _debug = false

const test_mesh = function (canvas, mesh) {
  if (!_debug) {
    mesh.rotate()
    // log(mesh.rotation)
    canvas.clear()
    canvas.drawMesh(mesh)
    // 渲染出来, 不调用这个函数就不会显示结果
    canvas.render()
  }
  setTimeout(function () {
    test_mesh(canvas, mesh)
  }, 1000 / 60)
}

// 函数名应该用 const 修饰, 这样不会被意外修改
const __main = function () {
  let canvas = GuaCanvas.new('#id-canvas')
  initSliders()

  // let cube = cube3d()
  // let mesh = AxeMesh.fromAxe3D(cube)

  // let chest = chest3d()
  // let mesh = AxeMesh.fromAxe3D(chest)

  // test_mesh(canvas, mesh)

  // canvas.drawImage(chestImageData())
  // canvas.drawImage(illidanImage())
  // log(canvas.imageData[0][0])
  // let mesh = AxeMesh.fromGua3D(illidanGua3d())
  // log(mesh)

  // canvas.drawImage(illidanImage())
  // let mesh = AxeMesh.fromAxe3D(illidan3D())

  // log(mesh)
  // test_mesh(canvas, mesh)
  // canvas.clear()
  // canvas.drawMesh(mesh)
  // canvas.render()

  // setInterval(function () {
  //   canvas.clear()

  // const tri = `axe3d
  // version 1.1
  // triangles 1
  // -1 0 0 -1 0 -1 0 0#1 0 0 1 0 -1 0 0#0 -1 0 0 -1 -1 0 0`
  // let mesh = AxeMesh.fromAxe3D(tri)
  // log(mesh)

  // const square = `axe3d
  // version 1.1
  // triangles 2
  // -1 1 0 -1 1 -1 0 0#1 1 0 1 1 -1 0 0#-1 -1 0 -1 -1 -1 0 0
  // -1 -1 0 -1 -1 -1 0 0#1 1 0 1 1 -1 0 0#1 -1 0 1 -1 -1 0 0`
  // let mesh = AxeMesh.fromAxe3D(square)

  let mesh = AxeMesh.fromGua3D(ball4_gua3d)
  log(mesh)

  setInterval(function () {
    canvas.clear()
    // 在这里配置
    canvas.camera = GuaCamera.new()
    mesh.rotation.x = config.rotation_x.value
    mesh.rotation.y = config.rotation_y.value
    mesh.rotation.z = config.rotation_z.value
    mesh.position.x = config.mesh_position_x.value
    mesh.position.y = config.mesh_position_y.value
    mesh.position.z = config.mesh_position_z.value
    canvas.light.x = Number.parseFloat(config.light_x.value)
    canvas.light.y = Number.parseFloat(config.light_y.value)
    canvas.light.z = Number.parseFloat(config.light_z.value)

    lightFlag = true

    canvas.drawMesh(mesh)
    canvas.render()
  }, 200)

  canvas.canvas.addEventListener('click', function () {
    log('canvas pixel', canvas.pixels)
  })

  window.addEventListener('keydown', function (e) {
    if (e.key === 'p') {
      _debug = !_debug
    }
  })
}

__main()