let {r, g, b} = {r: 0.2, g: 0.7, b: 0.2}
let {l, w, h, t} = {l: 0.25, w: 0.25, h: 0.25, t: 0.1}

const vertices = [
    // x, y, z,     r, g, b
    // Top outer
    -l, h, -w, r, g, b,
    l, h, -w, r, g, b,
    l, h, w, r, g, b,
    -l, h, w, r, g, b,
]

const indices = [
    // Top 
    0, 1, 9,
    9, 8, 0,
]