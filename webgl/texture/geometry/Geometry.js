class Geometry {
    constructor(buffer, transformation) {
        this.vertices = buffer.vertices;
        this.indices = buffer.indices;
        // this.textures = buffer.textures;
        this.setTransformationMatrix(transformation);
    }

    setTransformationMatrix(transformation) {
        let matrix = m4.identity();
        matrix = m4.translate(
            matrix,
            transformation.translation[0],
            transformation.translation[1],
            transformation.translation[2]
        );
        matrix = m4.xRotate(matrix, transformation.rotation[0]);
        matrix = m4.yRotate(matrix, transformation.rotation[1]);
        matrix = m4.zRotate(matrix, transformation.rotation[2]);
        matrix = m4.scale(matrix, 
            transformation.scale[0], 
            transformation.scale[1], 
            transformation.scale[2]
        );
    
        this.transformationMatrix = matrix;
    }

    generateWorldMatrix(ancestorMatrix) {
        return m4.multiply(this.transformationMatrix, ancestorMatrix);
    }

    render(gl, programInfo) {
        gl.useProgram(programInfo.program);

        // 1. Set buffers
        gl.bindBuffer(gl.ARRAY_BUFFER, programInfo.positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
        
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, programInfo.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);

        // 2. Set attributes
        gl.vertexAttribPointer(programInfo.positionLocation, 3,
            gl.FLOAT, gl.FALSE, 6 * Float32Array.BYTES_PER_ELEMENT, 0);

        gl.vertexAttribPointer(programInfo.colorLocation, 3, 
            gl.FLOAT, gl.FALSE, 6 * Float32Array.BYTES_PER_ELEMENT, 
            3 * Float32Array.BYTES_PER_ELEMENT);

        gl.enableVertexAttribArray(programInfo.positionLocation);
        gl.enableVertexAttribArray(programInfo.colorLocation);

        // 3. Set uniforms
        const worldMatrix = this.generateWorldMatrix(m4.identity());
        gl.uniformMatrix4fv(programInfo.worldLocation, gl.FALSE, worldMatrix);
        
        // 4. Draw
        gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_SHORT, 0);
    }

    rerender(gl, programInfo, transformation) {
        this.setTransformationMatrix(transformation);
        this.render(gl, programInfo);
    }
}