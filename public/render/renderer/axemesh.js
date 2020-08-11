class AxeMesh extends GuaObject {
	// 表示三维物体的类    
	constructor() {
		super()
		this.position = GuaVector.new(-1, -1, -1)
		this.rotation = GuaVector.new(0, 0, 0)
		this.scale = GuaVector.new(1, 1, 1)
		this.vertices = null
		this.indices = null
		this.triangles = []
	}

	// 返回一个正方体    
	static cube() {
		// 8 points        
		let points = [
			-1, 1, -1, // 0            
			1, 1, -1, // 1            
			-1, -1, -1, // 2            
			1, -1, -1, // 3            
			-1, 1, 1, // 4            
			1, 1, 1, // 5            
			-1, -1, 1, // 6            
			1, -1, 1, // 7        
		]
		let vertices = []
		for (let i = 0; i < points.length; i += 3) {
			let v = GuaVector.new(points[i], points[i + 1], points[i + 2])
			// let c = GuaColor.randomColor()            
			let c = GuaColor.lightblue()
			vertices.push(GuaVertex.new(v, c))
		}
		// 12 triangles * 3 vertices each = 36 vertex indices        
		let indices = [
			// 12            
			[0, 1, 2],
			[1, 3, 2],
			[1, 7, 3],
			[1, 5, 7],
			[5, 6, 7],
			[5, 4, 6],
			[4, 0, 6],
			[0, 2, 6],
			[0, 4, 5],
			[5, 1, 0],
			[2, 3, 7],
			[2, 7, 6],
		]
		let m = this.new()
		m.vertices = vertices
		m.indices = indices
		return m
	}

	static fromAxe3D(axe3dString) {
		let axeMesh = this.new()
		let lines = axe3dString.split('\n')
		let format = lines[0]
		let version = lines[1]
		for (let i = 3; i < lines.length; i++) {
			let line = lines[i]
			line = line.trim()
			let data = line.split('#')
			let triangle = []
			data.forEach(function (t) {
				if (t.split(' ').length === 5) {
					let [x, y, z, u, v] = t.split(' ')
					let vector = GuaVector.new(Number.parseFloat(x), Number.parseFloat(y), Number.parseFloat(z))
					let color = GuaColor.randomColor()
					let vertex = GuaVertex.new(vector, color, Math.abs(Number.parseFloat(u)), Math.abs(Number.parseFloat(v)))
					triangle.push(vertex)
				} else {
					let [x, y, z, nx, ny, nz, u, v] = t.split(' ')
					let vector = GuaVector.new(Number.parseFloat(x), Number.parseFloat(y), Number.parseFloat(z))
					let color = GuaColor.randomColor()
					let vertex = GuaVertex.new(vector, color, Math.abs(Number.parseFloat(u)), Math.abs(Number.parseFloat(v)), GuaVector.new(Number.parseFloat(nx), Number.parseFloat(ny), Number.parseFloat(nz)))
					triangle.push(vertex)
				}
			})
			axeMesh.triangles.push(triangle)
		}
		return axeMesh
	}

	static fromGua3D(axe3dString) {
		let axeMesh = this.new()
		let lines = axe3dString.split('\n')
		let format = lines[0]
		let version = lines[1]
		let verticeNum = Number.parseInt(lines[2].trim().split(' ')[1])
		let triangleNum = Number.parseInt(lines[3].trim().split(' ')[1])
		axeMesh.indices = []
		axeMesh.vertices = []
		for (let i = 4; i < verticeNum + 4; i++) {
			let line = lines[i]
			line = line.trim()
			let [x, y, z, nx, ny, nz, u, v] = line.split(' ')
			let vector = GuaVector.new(Number.parseFloat(x), Number.parseFloat(y), Number.parseFloat(z))
			let normal = GuaVector.new(Number.parseFloat(nx), Number.parseFloat(ny), Number.parseFloat(nz))
			let vn = normal.add(vector)
			let color = GuaColor.randomColor()
			let vertex = GuaVertex.new(vector, color, Math.abs(Number.parseFloat(u)), Math.abs(Number.parseFloat(v)), vn)
			axeMesh.vertices.push(vertex)
		}
		for (let i = verticeNum + 4; i < verticeNum + 4 + triangleNum; i++) {
			let line = lines[i]
			line = line.trim()
			let [x, y, z] = line.split(' ')
			axeMesh.indices.push([Number.parseInt(x), Number.parseInt(y), Number.parseInt(z)])
		}
		return axeMesh
	}

	rotate() {
		this.rotation.y += 0.1
		// this.rotation.x += 0.1
	}
}