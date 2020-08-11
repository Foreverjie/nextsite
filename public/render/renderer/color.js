class GuaColor extends GuaObject {
    // 表示颜色的类
    constructor(r, g, b, a) {
        super()
        this.r = r
        this.g = g
        this.b = b
        this.a = a
    }
    // 常见的几个颜色
    static black() {
        return this.new(0, 0, 0, 255)
    }
    static white() {
        return this.new(255, 255, 255, 255)
    }
    static red() {
        return this.new(255, 0, 0, 255)
    }
    static lightblue() {
        return this.new(173, 216, 230, 255)
    }
    static green() {
        return this.new(0, 255, 0, 255)
    }

    static randomColor() {
        let int = Math.round
        let r = int(255 * Math.random())
        let g = int(255 * Math.random())
        let b = int(255 * Math.random())
        return this.new(r, g, b, 255)
    }

    static mix(c, bg) {
        let alpha = c.a / 255

        let r = (1 - alpha) * bg.r + alpha * c.r
        let g = (1 - alpha) * bg.g + alpha * c.g
        let b = (1 - alpha) * bg.b + alpha * c.b
        let a = 255

        return GuaColor.new(r, g, b, a)
    }

    interpolate(other, factor) {
        let c1 = this
        let c2 = other
        let r = c1.r + (c2.r - c1.r) * factor
        let g = c1.g + (c2.g - c1.g) * factor
        let b = c1.b + (c2.b - c1.b) * factor
        let a = c1.a + (c2.a - c1.a) * factor
        return GuaColor.new(r, g, b, a)
    }

    static light(color, lightAngle) {
        let r = Math.abs(color.r * lightAngle)
        let g = Math.abs(color.g * lightAngle)
        let b = Math.abs(color.b * lightAngle)
        let a = color.a
        return GuaColor.new(r, g, b, a)
    }
}