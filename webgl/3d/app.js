const vertexShaderSource = `
attribute vec3 vertColor;
varying vec3 fragColor;

attribute vec4 a_position;
uniform mat4 cameraMatrix;
uniform mat4 u_matrix;
 
void main() {
    fragColor = vertColor;
    gl_Position = cameraMatrix * u_matrix * a_position;
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
    const matrixLocation = gl.getUniformLocation(program, "u_matrix");    
    const translation = [0, 0, 0];
    let rotation = [degToRad(0), degToRad(0), degToRad(0)];
    const scale = [1, 1, 1];

    let matrix = getTransformationMatrix(translation, rotation, scale);

    // Set the matrix.
    gl.uniformMatrix4fv(matrixLocation, false, matrix);

    // // ==============================================================
    const cameraLocation = gl.getUniformLocation(program, "cameraMatrix");  
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = -1;
    const zFar = 1;
    const projectionMatrix = m4.perspective(degToRad(100), aspect, zNear, zFar);

    // Define view matrix
    let cameraAngleRadians = degToRad(0);
    let radius = 1;
    // const viewMatrixLoc = gl.getUniformLocation(program, "viewMatrix");

    let cameraMatrix = m4.yRotation(cameraAngleRadians);
    cameraMatrix = m4.translate(cameraMatrix, 0, 0, radius * 1.5);

    // Get the camera's position from the matrix we computed
    const cameraPosition = [
      cameraMatrix[12],
      cameraMatrix[13],
      cameraMatrix[14],
    ];

    const up = [0, 1, 0];

    // Compute the camera's matrix using look at.
    cameraMatrix = m4.lookAt(cameraPosition, [0, 0, 0], up);

    // Make a view matrix from the camera matrix
    let viewMatrix = m4.inverse(cameraMatrix);

    // starting with the view projection matrix
    let viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);
    matrix = m4.translate(viewProjectionMatrix, 0, 0, 0);

    // Set the matrix.
    gl.uniformMatrix4fv(cameraLocation, false, matrix);
    // // ==============================================================

    // Draw
    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

    console.log("Main load done!");
    console.log(vertices.length);
    console.log(indices.length);
    const loop = function () {
		angle = performance.now() / 1000 / 6 * 2 * Math.PI;

		rotation = [0, angle, angle];
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
