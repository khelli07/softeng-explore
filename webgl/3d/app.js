const vertexShaderSource = `
attribute vec3 vertColor;
varying vec3 fragColor;

attribute vec4 a_position;
uniform mat4 u_matrix;
 
void main() {
    fragColor = vertColor;
    gl_Position = u_matrix * a_position;
}
`;

const fragmentShaderSource = `
precision mediump float; // best practice to specify this

varying vec3 fragColor;
void main() {
    gl_FragColor = vec4(fragColor, 1.0);
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
    gl.clearColor(0.75, 0.85, 0.8, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Specify depth test so the program hides the back
	gl.enable(gl.DEPTH_TEST);

    // Specify cull face so the program does not draw back
	gl.enable(gl.CULL_FACE);
	gl.frontFace(gl.CCW);
	gl.cullFace(gl.BACK);

    // Initialize shaders and program
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER,fragmentShaderSource);
    const program = createProgram(gl, vertexShader, fragmentShader);
    gl.useProgram(program);

    // Define vertex and indices
    let {r, g, b} = {r: 0, g: 0, b: 0};
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

    // Create buffer
    const positionBuffer = gl.createBuffer(); // buffer on GPU
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // Create index buffer
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    
    // Define vertex shader attribute
    const positionLocation = gl.getAttribLocation(program, "a_position");
    const colorLocation = gl.getAttribLocation(program, "vertColor");
    gl.vertexAttribPointer(
        positionLocation, // Attribute location
        3, // Number of elements per attribute
        gl.FLOAT, // Type of elements
        gl.FALSE,
        6 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
        0 // Offset from the beginning of a single vertex to this attribute
    );

    gl.vertexAttribPointer(
        colorLocation, // Attribute location
        3, // Number of elements per attribute
        gl.FLOAT, // Type of elements
        gl.FALSE,
        6 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
        3 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
    );

    gl.enableVertexAttribArray(positionLocation);
    gl.enableVertexAttribArray(colorLocation);

    // Define uniform matrix
    const translation = [0, 0, 0];
    let rotation = [degToRad(0), degToRad(0), degToRad(0)];
    const scale = [1, 1, 1];

    let matrix = getTransformationMatrix(translation, rotation, scale);

    // Set the matrix.
    const matrixLocation = gl.getUniformLocation(program, "u_matrix");
    gl.uniformMatrix4fv(matrixLocation, false, matrix);

    // Draw
    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

    console.log("Main load done!");

    const loop = function () {
		angle = performance.now() / 1000 / 6 * 2 * Math.PI;

		rotation = [degToRad(-20), angle, 0];
        matrix = getTransformationMatrix(translation, rotation, scale);
        gl.uniformMatrix4fv(matrixLocation, false, matrix);

        gl.clearColor(0.75, 0.85, 0.8, 1.0);
	    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

		requestAnimationFrame(loop);
	};
	requestAnimationFrame(loop);
};

main();
