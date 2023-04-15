/* 
// For each object
1. Set buffers and attriutes
2. Compute matrix
3. Set uniforms
4. Draw
*/

/* 
interface programInfo {
    program: WebGLProgram;
    
    positionLocation: WebGLAttribLocation;
    colorLocation: WebGLAttribLocation;
    
    positionBuffer: WebGLBuffer;
    indexBuffer: WebGLBuffer;

    worldLocation: WebGLUniformLocation;
}

interface transformation {
    translation: Array<number>;
    rotation: Array<number>;
    scale: Array<number>;
}

*/

function render(gl, programInfo, geometry) {
    gl.useProgram(programInfo.program);

    // Set vertex buffers
    gl.bindBuffer(gl.ARRAY_BUFFER, programInfo.positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(geometry.vertices), gl.STATIC_DRAW);
    
    // Set index buffers
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, programInfo.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(geometry.indices), gl.STATIC_DRAW);

    // Set attributes
    gl.vertexAttribPointer(
        programInfo.positionLocation,
        3,
        gl.FLOAT, 
        gl.FALSE,
        6 * Float32Array.BYTES_PER_ELEMENT, 
        0 
    );

    gl.vertexAttribPointer(
        programInfo.colorLocation, 
        3, 
        gl.FLOAT,
        gl.FALSE,
        6 * Float32Array.BYTES_PER_ELEMENT, 
        3 * Float32Array.BYTES_PER_ELEMENT
    );

    gl.enableVertexAttribArray(programInfo.positionLocation);
    gl.enableVertexAttribArray(programInfo.colorLocation);

    // Set uniforms
    const worldMatrix = geometry.generateUniform();
    
    gl.uniformMatrix4fv(programInfo.worldLocation, gl.FALSE, worldMatrix);
    
    // Draw
    gl.drawElements(gl.TRIANGLES, geometry.indices.length, gl.UNSIGNED_SHORT, 0);
}

function rerender() {
    // pass
}