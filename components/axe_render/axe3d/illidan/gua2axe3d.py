import sys
import os


log = print


class GuaColor(object):
    def __init__(self, r, g, b, a):
        self.r = r
        self.g = g
        self.b = b
        self.a = a


class GuaVector(object):
    def __init__(self, x, y, z):
        self.x = x
        self.y = y
        self.z = z


class GuaVertex(object):
    def __init__(self, position, color, normal, u, v):
        self.position = position
        self.color = color
        self.normal = normal
        self.u = u
        self.v = v


class GuaMesh(object):
    def __init__(self):
        this = self
        this.position = GuaVector(0, 0, 0)
        this.rotation = GuaVector(0, 0, 0)
        this.scale = GuaVector(1, 1, 1)
        this.vertices = None
        this.indices = None
        this.texture = None

    @staticmethod
    def fromGua3D(gua3d):
        # gua3d: String
        lines = gua3d.split('\n')
        # log('lines: ', lines)
        # file type
        lines.pop(0)
        # version
        lines.pop(0)
        # fomart meta
        line = lines.pop(0)
        numberOfVertices = int(line.split(' ')[1])
        # log('numberOfVertices: ', numberOfVertices)
        line = lines.pop(0)
        numberOfTriangles = int(line.split(' ')[1])
        # log('numberOfTriangles: ', numberOfTriangles)

        vertices = []
        for i in range(numberOfVertices):
            line = lines.pop(0)
            items = line.split(' ')

            [x, y, z] = [float(item) for item in items[0:3]]
            p = GuaVector(x, y, z)

            [nx, ny, nz] = [float(item) for item in items[3:6]]
            n = GuaVector(nx, ny, nz)

            [u, v] = [float(item) for item in items[6:8]]

            c = GuaColor(0, 0, 0, 1)

            vertex = GuaVertex(p, c, n, u, v)
            vertices.append(vertex)

        indices = []
        for i in range(numberOfTriangles):
            line = lines.pop(0)
            t = [int(item) for item in line.split(' ')]
            indices.append(t)

        m = GuaMesh()
        m.vertices = vertices
        m.indices = indices
        return m

    def toAxe3D(self):
        s = ''
        s += 'axe3d\n'
        s += 'version 1.0\n'
        s += 'triangles {}\n'.format(len(self.indices))
        for indices in self.indices:
            vs = [self.vertices[i] for i in indices]

            vs_data = []
            for v in vs:
                p = v.position
                n = v.normal
                vu = v.u
                vv = v.v
                v_data = '{x} {y} {z} {nx} {ny} {nz} {u} {v}'.format(
                    x=p.x,
                    y=p.y,
                    z=p.z,
                    nx=n.x,
                    ny=n.y,
                    nz=n.z,
                    u=vu,
                    v=vv,
                )
                vs_data.append(v_data)
            line = '#'.join(vs_data)
            s += line + '\n'
        return s


def main():
    path_in = sys.argv[1]
    # log(path_in)
    with open(path_in) as f:
        gua3d = f.read()
        mesh = GuaMesh.fromGua3D(gua3d)

    path_out  = os.path.splitext(path_in)[0] + '.axe3d'
    axe3d = mesh.toAxe3D()
    with open(path_out, 'w') as f:
        f.write(axe3d)


if __name__ == "__main__":
    main()
