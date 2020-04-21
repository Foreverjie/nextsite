const cones3d = function () {
    return `axe3d
version 1.0
triangles 4
0 0 0#1 0 0#0 1 0
0 0 0#1 0 0#0 0 1
0 0 0#0 1 0#0 0 1
1 0 0#0 1 0#0 0 1`
}

class GuaCamera extends GuaObject {
    constructor() {
        super()
        // 镜头在世界坐标系中的坐标
        // this.position = GuaVector.new(0, 0, -10)
        this.position = GuaVector.new(config.camera_position_x.value, config.camera_position_y.value, config.camera_position_z.value)
        // 镜头看的地方
        // this.target = GuaVector.new(0, 0, 0)
        this.target = GuaVector.new(config.camera_target_x.value, config.camera_target_y.value, config.camera_target_z.value)
        // 镜头向上的方向
        // this.up = GuaVector.new(0, 1, 0)
        this.up = GuaVector.new(config.camera_up_x.value, config.camera_up_y.value, config.camera_up_z.value)
    }
}

class GuaCanvas extends GuaObject {
    constructor(selector) {
        super()
        let canvas = _e(selector)
        this.canvas = canvas
        this.context = canvas.getContext('2d')
        this.w = canvas.width
        this.h = canvas.height
        this.pixels = this.context.getImageData(0, 0, this.w, this.h)
        this.bytesPerPixel = 4
        // this.pixelBuffer = this.pixels.data
        this.camera = GuaCamera.new()
        this.light = GuaVector.new(config.light_x.value, config.light_y.value, config.light_z.value)
        this.setupDepth()
    }
    setupDepth() {
        this.depths = []
        for (let i = 0; i <= this.w; i++) {
            this.depths[i] = []
            for (let j = 0; j <= this.h; j++) {
                this.depths[i][j] = Number.MAX_SAFE_INTEGER
            }
        }
    }
    render() {
        // 执行这个函数后, 才会实际地把图像画出来
        // ES6 新语法, 取出想要的属性并赋值给变量, 不懂自己搜「ES6 新语法」
        let {
            pixels,
            context
        } = this
        context.putImageData(pixels, 0, 0)
    }
    clear(color = GuaColor.black()) {
        // color GuaColor
        // 用 color 填充整个 canvas
        // 遍历每个像素点, 设置像素点的颜色
        let {
            w,
            h
        } = this
        for (let x = 0; x < w; x++) {
            for (let y = 0; y < h; y++) {
                this._setPixel(x, y, Number.MIN_SAFE_INTEGER, color)
            }
        }
        this.render()
        this.setupDepth()
    }
    _getPixel(x, y) {
        let int = Math.round
        x = int(x)
        y = int(y)
        // 用座标算像素下标
        let i = (y * this.w + x) * this.bytesPerPixel
        let p = this.pixels.data
        return GuaColor.new(p[i], p[i + 1], p[i + 2], p[i + 3])
    }
    _setPixel(x, y, z, color) {
        // color: GuaColor
        // 这个函数用来设置像素点, _ 开头表示这是一个内部函数, 这是我们的约定
        // 浮点转 int
        let int = Math.round
        x = int(x)
        y = int(y)
        // 用座标算像素下标
        if (z < this.depths[x][y]) {
            let i = (y * this.w + x) * this.bytesPerPixel
            // 设置像素
            let p = this.pixels.data
            let {
                r,
                g,
                b,
                a
            } = color
            // 一个像素 4 字节, 分别表示 r g b a
            if (int(a) !== 0) {
                p[i] = int(r)
                p[i + 1] = int(g)
                p[i + 2] = int(b)
                p[i + 3] = int(a)
                this.depths[x][y] = z
            }
        }
    }
    drawPoint(point, color = GuaColor.black()) {
        // TODO: z-buffer
        // point: GuaPoint
        let {
            w,
            h
        } = this
        let p = point
        if (p.x >= 0 && p.x <= w) {
            if (p.y >= 0 && p.y <= h) {
                // let bgColor = GuaColor.black()
                let bgColor = this._getPixel(p.x, p.y)
                let realColor = GuaColor.mix(color, bgColor)
                this._setPixel(p.x, p.y, p.z, realColor)
            }
        }
    }
    drawLine(p1, p2, color = GuaColor.white()) {
        let [x1, y1, x2, y2, z1, z2] = [p1.x, p1.y, p2.x, p2.y, p1.z, p2.z]
        let dx = x2 - x1
        let dy = y2 - y1
        let R = (dx ** 2 + dy ** 2) ** 0.5
        let ratio = dx === 0 ? undefined : dy / dx
        let angle = 0
        if (ratio === undefined) {
            const p = Math.PI / 2
            angle = dy >= 0 ? p : -p
        } else {
            const t = Math.abs(dy / R)
            const sin = ratio >= 0 ? t : -t
            const asin = Math.asin(sin)
            angle = dx > 0 ? asin : asin + Math.PI
        }
        for (let r = 0; r <= R; r++) {
            const x = x1 + Math.cos(angle) * r
            const y = y1 + Math.sin(angle) * r
            let factor = 0
            if (y2 != y1) {
                factor = (y - y1) / (y2 - y1);
            }
            // z 轴
            let z = interpolate(z1, z2, factor) - 0.0001
            this.drawPoint(GuaVector.new(x, y, z), color)
        }
    }
    drawScanline(v1, v2, lightAngle) {
        let [a, b] = [v1, v2].sort((va, vb) => va.position.x - vb.position.x)
        let y = a.position.y
        let x1 = a.position.x
        let x2 = b.position.x
        for (let x = x1; x <= x2; x++) {
            let factor = 0
            if (x2 != x1) {
                factor = (x - x1) / (x2 - x1);
            }
            // log(a, b)
            let int = Math.floor
            let u = a.u + (b.u - a.u) * factor
            let v = a.v + (b.v - a.v) * factor
            let colorX = int(255 * u)
            let colorY = int(255 * v)
            let color = GuaColor.lightblue()
            if (this.imageData) {
                color = this.imageData[colorY][colorX]
            }
            let lightColor = GuaColor.light(color, lightAngle)
            let {
                position
            } = a.interpolate(b, factor)
            this.drawPoint(position, lightColor)
        }
    }
    drawTriangle(v1, v2, v3) {
        // log(v1)
        let [a, b, c] = [v1, v2, v3].sort((va, vb) => va.position.y - vb.position.y)
        // this.drawLine(a.position, a.normal, GuaColor.green())
        // this.drawLine(b.position, b.normal, GuaColor.green())
        // this.drawLine(c.position, c.normal, GuaColor.green())

        let core = GuaVector.core(a.position, b.position, c.position)
        // 画重心
        // this.drawBigPoint(GuaVertex.new(core, GuaColor.red()))

        let lightVector = this.light.sub(core)
        // this.drawLine(this.light, core)
        let normal = GuaVector.core(a.normal, b.normal, c.normal)
        // 三角形法向量
        // this.drawLine(normal, core, GuaColor.green())
        // let angle = lightVector.cos(normal)
        let angle = lightVector.cos(normal.sub(core))
        // log(lightVector, normal, normal.sub(core))
        // log(angle)
        // log(a, b, c)
        let middle_factor = 0
        if (c.position.y - a.position.y != 0) {
            middle_factor = (b.position.y - a.position.y) / (c.position.y - a.position.y)
        }
        let middle = a.interpolate(c, middle_factor)
        let start_y = a.position.y
        let end_y = b.position.y
        for (let y = start_y; y <= end_y; y++) {
            let factor = 0
            if (end_y != start_y) {
                factor = (y - start_y) / (end_y - start_y)
            }
            let va = a.interpolate(middle, factor)
            let vb = a.interpolate(b, factor)
            // log(va.position, vb.position)
            this.drawScanline(va, vb, angle)
        }
        start_y = b.position.y
        end_y = c.position.y
        for (let y = start_y; y <= end_y; y++) {
            let factor = 0
            if (end_y != start_y) {
                factor = (y - start_y) / (end_y - start_y)
            }
            let va = middle.interpolate(c, factor)
            let vb = b.interpolate(c, factor)
            // log(va.position, vb.position)
            this.drawScanline(va, vb, angle)
        }
    }
    // drawTriangleLine
    project(coordVector, transformMatrix) {
        // log(coordVector)
        let {
            w,
            h
        } = this
        let [w2, h2] = [w / 2, h / 2]
        let point = transformMatrix.transform(coordVector.position)
        let normal = transformMatrix.transform(coordVector.normal)
        let x = point.x * w2 + w2
        let y = -point.y * h2 + h2
        let nx = normal.x * w2 + w2
        let ny = -normal.y * h2 + h2

        let v = GuaVector.new(x, y, point.z)
        let nv = GuaVector.new(nx, ny, normal.z)
        return GuaVertex.new(v, coordVector.color, coordVector.u, coordVector.v, nv)
    }
    drawMesh(mesh) {
        let self = this
        // camera
        let {
            w,
            h
        } = this
        let {
            position,
            target,
            up
        } = self.camera
        const view = Matrix.lookAtLH(position, target, up)
        // field of view
        const projection = Matrix.perspectiveFovLH(0.8, w / h, 0.1, 1)

        // 得到 mesh 中点在世界中的坐标
        const rotation = Matrix.rotation(mesh.rotation)
        const translation = Matrix.translation(mesh.position)
        const world = rotation.multiply(translation)

        const transform = world.multiply(view).multiply(projection)

        this.drawBigPoint(GuaVertex.new(this.light, GuaColor.white()))

        if (mesh.indices !== null) {
            for (let t of mesh.indices) {
                // 拿到三角形的三个顶点
                let [a, b, c] = t.map(i => mesh.vertices[i])
                // log('a', a)
                // 拿到屏幕上的 3 个像素点
                let [v1, v2, v3] = [a, b, c].map(v => self.project(v, transform))
                // 把这个三角形画出来
                // log('v1', v1)
                let core = GuaVector.core(v1.position, v2.position, v3.position)
                // 画重心
                let cameraVector = this.camera.position.sub(core)
                // this.drawLine(this.light, core)
                let normal = GuaVector.core(v1.normal, v2.normal, v3.normal)
                // 三角形法向量
                // this.drawLine(normal, core, GuaColor.green())
                let angle = cameraVector.cos(normal.sub(core))
                if (angle > 0) {
                    self.drawTriangle(v1, v2, v3)
                    // self.drawLine(v1.position, v2.position)
                    // self.drawLine(v1.position, v3.position)
                    // self.drawLine(v2.position, v3.position)
                }
            }
        }
        if (mesh.triangles !== []) {
            for (let t of mesh.triangles) {
                let [a, b, c] = [t[0], t[1], t[2]]
                // log('a', a)
                // log(a, b, c)
                let [v1, v2, v3] = [a, b, c].map(v => self.project(v, transform))
                // 把这个三角形画出来
                // log(v1, v2, v3)
                // log('v1', v1)

                let core = GuaVector.core(v1.position, v2.position, v3.position)
                // 画重心
                let cameraVector = this.camera.position.sub(core)
                // this.drawLine(this.light, core)
                let normal = GuaVector.core(v1.normal, v2.normal, v3.normal)
                // 三角形法向量
                // this.drawLine(normal, core, GuaColor.green())
                let angle = cameraVector.cos(normal.sub(core))
                if (angle > 0) {
                    self.drawTriangle(v1, v2, v3)
                    self.drawLine(v1.position, v2.position)
                    self.drawLine(v1.position, v3.position)
                    self.drawLine(v2.position, v3.position)
                }
            }
        }

    }
    drawImage(imageData) {
        let lines = imageData.split('\n')
        const int = Math.round
        let format = lines[0]
        let version = lines[1]
        let w = int(lines[2].trim())
        let h = int(lines[3].trim())
        let image = []
        for (let i = 4; i < lines.length; i++) {
            let line = lines[i]
            line = line.trim()
            let data = line.split('#')
            let points = []
            data.forEach(function (t) {
                let [r, g, b, a] = t.split(' ')
                let int = Math.round
                let color = GuaColor.new(int(r), int(g), int(b), int(a))
                points.push(color)
            })
            image.push(points)
        }
        // 画图
        for (let i = 0; i < w; i++) {
            for (let j = 0; j < h; j++) {
                this._setPixel(i, j, 0, image[j][i])
            }
        }
        this.imageData = image
        return image
    }

    drawBigPoint(vertex) {
        let {
            w,
            h
        } = this
        let p = vertex.position

        if (p.x >= 0 && p.x <= w) {
            if (p.y >= 0 && p.y <= h) {
                for (let i = 0; i < 4; i++) {
                    for (let j = 0; j < 4; j++) {
                        this._setPixel(p.x + i, p.y + j, p.z, vertex.color)
                    }
                }
            }
        }
    }
    __debug_draw_demo() {
        // 这是一个 demo 函数, 用来给你看看如何设置像素
        // ES6 新语法, 取出想要的属性并赋值给变量, 不懂自己搜「ES6 新语法」
        let {
            context,
            pixels
        } = this
        // 获取像素数据, data 是一个数组
        let data = pixels.data
        // 一个像素 4 字节, 分别表示 r g b a
        for (let i = 0; i < data.length; i += 4) {
            let [r, g, b, a] = data.slice(i, i + 4)
            r = 255
            a = 255
            data[i] = r
            data[i + 3] = a
        }
        context.putImageData(pixels, 0, 0)
    }
}