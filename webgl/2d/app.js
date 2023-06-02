/* 
Notes:

* gl_Position (vertex shader) and gl_FragColor (fragment shader) are special variables. They must be specified.

* Process: 
Raw vertex data (CPU) -> Buffer (GPU) -> Shader Program (GPU) [Vertex Shader -> Fragment Shader] -> Display

* For each shader: 
    1. Create shader
    2. Put source (text) to the shader
    3. Compile shader
    4. Attach shader to program (after created)

* Program:
    1. Create program
    2. Attach shaders
    3. Link program

* MUST DO:
    1. Create buffer
    2. Specify inputs (attribute, uniform) for vertex shader
    3. Use program

*/

const vertexShaderSource = `
attribute vec4 a_position;

void main() {
    gl_Position = a_position;
}
`;

const fragmentShaderSource = `
precision mediump float; // best practice to specify this

void main() {
    gl_FragColor = vec4(1, 0, 0.5, 1);
}
`;

function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    return shader;
    }

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
    return program;
    }

    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}

function getQuadrant(x, y) {
    if (x >= 0 && y >= 0) return 1;
    if (x <= 0 && y > 0) return 2;
    if (x < 0 && y <= 0) return 3;
    if (x > 0 && y < 0) return 4;
}

function angleComparison(a, b) {
    const aQuadrant = getQuadrant(a[0], a[1]);
    const bQuadrant = getQuadrant(b[0], b[1]);
    if (aQuadrant === bQuadrant) {
        return Math.atan(a[1] / a[0]) - Math.atan(b[1] / b[0]);
    } else {
        return aQuadrant - bQuadrant;
    }
}

const main = function () {
    // Initialize GL
    const canvas = document.querySelector("#glcanvas");
    const gl = canvas.getContext("webgl");

    if (!gl) {
    alert(
        "Unable to initialize WebGL. Your browser or machine may not support it."
    );
    return;
    }

    gl.clearColor(0.9, 0.9, 0.9, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Initialize shaders and program

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentShaderSource
    );
    const program = createProgram(gl, vertexShader, fragmentShader);

    // Create buffer
    const positionBuffer = gl.createBuffer(); // buffer on GPU
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Define vertex shader attribute "a_position"
    const positionAttributeLocation = gl.getAttribLocation(program, "a_position"); // a_position is the name of vertexShaderSource's attribute

    gl.vertexAttribPointer(
    positionAttributeLocation,
    2, // how many element per vertex
    gl.FLOAT, // type
    gl.FALSE, // don't normalize data
    2 * Float32Array.BYTES_PER_ELEMENT, // stride
    0 // offset
    );
    gl.enableVertexAttribArray(positionAttributeLocation);

    // Vertices
    let points = [
        [0.4, 0],
        [0.25, 0.25],
        [-0.25, -0.25],
        [-0.4, 0],
        [0.25, -0.25],
        [0, 0.5],        
        [-0.25, 0.25],
        [0.1, 0.1]
    ];


    points = points.sort((a, b) => angleComparison(a, b));
    console.log(points);

    let vertices = []
    for (let i = 0; i < points.length; i++) {
        vertices.push(points[i][0]);
        vertices.push(points[i][1]);
    }
    // console.log(vertices);

    // Main render loop
    gl.useProgram(program);

    // Supply data to buffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.drawArrays(gl.LINE_LOOP, 0, vertices.length / 2);
};
