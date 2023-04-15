let {r, g, b} = {r: 0.5, g:0.2, b: 0.2};

const vertices = [
    // x, y, z,     r, g, b
    0, 0.4, 0,                r+0.75, g+0.75, b+0.75,
    
    // Top square
    -0.075, 0.5, 0.0,           r, g, b,
    0.0, 0.5, -0.075,           r, g, b,
    0.075, 0.5, 0.0,            r, g, b,
    0.0, 0.5, 0.075,            r, g, b,
    
    // Right-back square
    0.4, -0.5, -0.5,        r, g, b,
    0.5, -0.5, -0.5,        r, g, b,
    0.5, -0.5, -0.4,        r, g, b,
    0.4, -0.4, -0.35,        r+0.75, g+0.75, b+0.75,
    
    // Left-back square
    -0.5, -0.5, -0.5,       r, g, b,
    -0.4, -0.5, -0.5,       r, g, b,
    -0.4, -0.4, -0.35,       r+0.75, g+0.75, b+0.75,
    -0.5, -0.5, -0.4,       r, g, b,
    
    // Right-front square
    0.4, -0.4, 0.35,        r+0.75, g+0.75, b+0.75,
    0.5, -0.5, 0.4,        r, g, b,
    0.5, -0.5, 0.5,        r, g, b,
    0.4, -0.5, 0.5,        r, g, b,
    
    // Left-front square
    -0.5, -0.5, 0.4,       r, g, b,
    -0.4, -0.4, 0.35,       r+0.75, g+0.75, b+0.75,
    -0.4, -0.5, 0.5,       r, g, b,
    -0.5, -0.5, 0.5,       r, g, b, 
];

const indices = [
    // Top close
    1, 2, 3,
    3, 4, 1,

    // Top to right back
    0, 2, 3,
    8, 7, 5,

    2, 5, 7,
    7, 3, 2,
    
    5, 2, 0,
    0, 8, 5,

    3, 7, 8,
    8, 0, 3,

    // Top to left back
    0, 1, 2,
    11, 10, 12,

    10, 2, 1,
    1, 12, 10,

    11, 0, 2,
    2, 10, 11,

    12, 1, 0,
    0, 11, 12,
    
    // Top to right front
    0, 3, 4,
    13, 16, 14,

    4, 3, 14,
    14, 16, 4,

    0, 13, 14,
    14, 3, 0,

    0, 4, 16,
    16, 13, 0,
    
    // Top to left front
    0, 4, 1,
    18, 17, 19,

    17, 1, 4,
    4, 19, 17,

    0, 1, 17, 
    17, 18, 0,

    0, 18, 19,
    19, 4, 0,

    // Left back to right back
    5, 10, 12,
    12, 7, 5,

    10, 5, 8,
    8, 11, 10,

    11, 8, 7,
    7, 12, 11,

    // Right front to left front
    14, 17, 19, 
    19, 16, 14,

    18, 13, 16,
    16, 19, 18,
    
    17, 14, 13, 
    13, 18, 17,

    // Right back to right front
    7, 5, 16,
    16, 14, 7,

    7, 14, 13,
    13, 8, 7,

    13, 16, 5,
    5, 8, 13,

    // Left back to left front
    10, 12, 17,
    17, 19, 10,

    12, 11, 18,
    18, 17, 12,

    11, 18, 19,
    19, 10, 11,

    18, 11, 10,
    10, 19, 18,            
];