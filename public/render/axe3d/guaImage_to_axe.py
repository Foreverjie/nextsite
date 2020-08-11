log = print

def getColor(data):
    r = str((data >> 24) & 255)
    g = str((data >> 16) & 255)
    b = str((data >> 8) & 255)
    a = str(data & 255)
    # 末尾加不加# 还需要测试
    return r + ' ' + g + ' ' + b + ' ' + a

def toAxeImage():
    axeImage = ''
    with open('illidan.guaimage', 'r') as f:
        content = f.read()
        content = content.split('\n')

        version = content[1]
        width = content[2]
        height = content[3]
        cnt = 0

        axeImage += 'axeimage\n1.0\n'
        axeImage += width + '\n'
        axeImage += height + '\n'

        for line in content[4:]:
            line = line.split(' ')
            if len(line) <= 1:
                break
            # 用来组成一行rgba#
            temp = ''
            for i, c in enumerate(line):
                # 一个32位颜色
                c = int(c)
                color = getColor(c)
                temp += color
                if i != len(line)-1:
                    temp += '#'

            temp += '\n'
            axeImage += temp

        # 需要考虑要不要不存字符串,可能会挂掉,变读边写
    with open('illidan.axeimage', 'w') as f:
        f.write(axeImage)

if __name__ == '__main__':
    toAxeImage()
