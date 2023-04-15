r, g, b = 0.5, 0.5, 0.5

vertex = [
    0.5,
    0.5,
    0.25,
    r,
    g,
    b,
    -0.5,
    0.5,
    0.25,
    r,
    g,
    b,
    -0.5,
    -0.5,
    0.25,
    r,
    g,
    b,
    0.5,
    -0.5,
    0.25,
    r,
    g,
    b,
    0.5,
    0.5,
    -0.25,
    r,
    g,
    b,
    -0.5,
    0.5,
    -0.25,
    r,
    g,
    b,
    -0.5,
    -0.5,
    -0.25,
    r,
    g,
    b,
    0.5,
    -0.5,
    -0.25,
    r,
    g,
    b,
]

index = [
    0,
    1,
    2,
    2,
    3,
    0,
    4,
    7,
    6,
    6,
    5,
    4,
    4,
    5,
    1,
    1,
    0,
    4,
    7,
    3,
    2,
    2,
    6,
    7,
    4,
    0,
    3,
    3,
    7,
    4,
    5,
    6,
    2,
    2,
    1,
    5,
]

vertices = []
indices = [i for i in range(len(index))]
for i in index:
    vertices.extend(vertex[i * 6 : i * 6 + 3])

assert len(vertices) == len(indices) * 3

f = open("cube.txt", "w")
f.write(str(vertices))
f.write("\n")
f.write(str(indices))
f.close()
