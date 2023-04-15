const {r, g, b} = {r: 0.5, g: 0.5, b: 0.5};
const buffer = {
    vertex: [
        // Make cube
        // Front face
        0.5, 0.5, 0.25, r, g, b,
        -0.5, 0.5, 0.25, r, g, b,
        -0.5, -0.5, 0.25, r, g, b,
        0.5, -0.5, 0.25, r, g, b,

        // Back face
        0.5, 0.5, -0.25, r, g, b,
        -0.5, 0.5, -0.25, r, g, b,
        -0.5, -0.5, -0.25, r, g, b,
        0.5, -0.5, -0.25, r, g, b,
    ],
    index: [
        // Front face
        0, 1, 2,
        2, 3, 0,

        // Back face
        4, 7, 6,
        6, 5, 4,

        // Top face
        4, 5, 1,
        1, 0, 4,

        // Bottom face
        7, 3, 2,
        2, 6, 7,

        // Right face
        4, 0, 3,
        3, 7, 4,

        // Left face
        5, 6, 2,
        2, 1, 5,
    ]
}

const transformation = {
    translation : [0, 0, 0],
    rotation : [degToRad(0), degToRad(0), degToRad(0)],
    scale : [1, 1, 1]
}

const transformation2 = {
    translation : [0.5, 0.5, 0],
    rotation : [degToRad(0), degToRad(0), degToRad(0)],
    scale : [1, 1, 1]
}

const transformation3 = {
    translation : [-0.5, -0.5, 0],
    rotation : [degToRad(0), degToRad(0), degToRad(0)],
    scale : [1, 1, 1]
}
