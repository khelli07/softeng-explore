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
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertex), gl.STATIC_DRAW);

    // Create index buffer
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    // ==============================================================
    const worldLocation = gl.getUniformLocation(program, "worldMatrix");
    // const cameraLocation = gl.getUniformLocation(program, "viewMatrix");  
    // const projLocation = gl.getUniformLocation(program, "projMatrix");  

    gl.uniformMatrix4fv(worldLocation, false, m4.identity());
    // gl.uniformMatrix4fv(cameraLocation, false, m4.identity());
    // gl.uniformMatrix4fv(projLocation, false, m4.identity());
    
    // Define vertex shader attribute
    const positionLocation = gl.getAttribLocation(program, "vertPosition");
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

    // Draw
    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

    console.log("Main load done!");
    const loop = function () {
		angle = performance.now() / 1000 / 6 * 2 * Math.PI;

		rotation = [angle, angle, 0];
        matrix = getTransformationMatrix(translation, rotation, scale);
        gl.uniformMatrix4fv(worldLocation, false, matrix);

        
        gl.clearColor(0.75, 0.85, 0.8, 1.0);
	    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

		requestAnimationFrame(loop);
	};
	// requestAnimationFrame(loop);
};

main();
