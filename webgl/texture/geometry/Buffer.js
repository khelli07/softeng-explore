class Buffer {
    constructor(vertices, indices) {
        this.vertices = vertices;
        this.indices = indices;
    }
    
    draw(gl) {
        gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_SHORT, 0);
    }

    setColor(colors) {
        /* Example: 
        let colors = [
            [r, g, b],
            [r, g, b],
            ...] 
        */
        
        if (colors.length != this.vertices.length / 6) {
            throw new Error("Number of colors does not match number of vertices");
        }

        for (let i = 0; i < colors.length; i++) {
            this.vertices[i * 6 + 3] = colors[i][0];
            this.vertices[i * 6 + 4] = colors[i][1];
            this.vertices[i * 6 + 5] = colors[i][2];
        }
    }

    bind(gl, programInfo) {
        this.bindVertices(gl, programInfo);
        this.bindIndices(gl, programInfo);
        // this.bindTextures(gl, programInfo);
    }

    bindVertices(gl, programInfo) {
        gl.bindBuffer(gl.ARRAY_BUFFER, programInfo.positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
    }

    bindIndices(gl, programInfo) {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, programInfo.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);       
    }

    bindTextures(gl, programInfo) {
        // TODO
    }
}