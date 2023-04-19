class Buffer {
    constructor(positions, indices, textures, normals) {
        this.positions = positions || [];
        this.indices = indices || [];
        this.textures = textures || [];
        this.normals = normals || [];
    }
    
    draw(gl) {
        gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_SHORT, 0);
    }

    bind(gl, programInfo) {
        this.bindPositions(gl, programInfo);
        this.bindIndices(gl, programInfo);
        if (programInfo.colorLocation != "undefined") {
            this.bindColors(gl, programInfo);
        }
        if (programInfo.normalLocation) {
            this.bindNormals(gl, programInfo);
        }
        // this.bindTextures(gl, programInfo);
    }

    bindPositions(gl, programInfo) {
        if (!this.positions || !programInfo.positionBuffer) {
            throw new Error("position should be defined first!");
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, programInfo.positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW);
        gl.vertexAttribPointer(programInfo.positionLocation, 3,
            gl.FLOAT, gl.FALSE, 3 * Float32Array.BYTES_PER_ELEMENT, 0);
        gl.enableVertexAttribArray(programInfo.positionLocation);
    }

    bindIndices(gl, programInfo) {
        if (!this.indices || !programInfo.indexBuffer) {
            throw new Error("Indices should be defined first!");
        }
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, programInfo.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);       
    }

    bindNormals(gl, programInfo) {
        if (!this.normals || !programInfo.normalBuffer) {
            throw new Error("Normals should be defined first!");
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, programInfo.normalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normals), gl.STATIC_DRAW);
        gl.vertexAttribPointer(programInfo.normalLocation, 3, 
            gl.FLOAT, gl.FALSE, 0, 0);
        gl.enableVertexAttribArray(programInfo.normalLocation);
    }

    bindColors(gl, programInfo) {
        if (!this.colors || !programInfo.colorBuffer) {
            throw new Error("Colors should be defined first!");
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, programInfo.colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.colors), gl.STATIC_DRAW);
        gl.vertexAttribPointer(programInfo.colorLocation, 3, 
            gl.FLOAT, gl.FALSE, 3 * Float32Array.BYTES_PER_ELEMENT, 0);
        gl.enableVertexAttribArray(programInfo.colorLocation);
    }

    bindTextures(gl, programInfo) {
        // ??
    }
}