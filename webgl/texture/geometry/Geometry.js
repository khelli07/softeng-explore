class Geometry {
    #gl;
    #lastProgramInfo;
    
    constructor(buffer, transformation) {
        this.buffer = buffer;
        this.transformation = transformation.clone();
        
        this.rotationCenter = m4.identity();
        this.invRotationCenter = m4.identity();
        this.setTransformationMatrix();
        
        this.animationIsSet = false;
    }

    render(gl, programInfo) {
        // 0. Save OpenGL state
        this.#gl = gl;
        this.#lastProgramInfo = programInfo;

        // 1. Use program
        gl.useProgram(programInfo.program);

        // 2. Set buffers
        this.buffer.bind(gl, programInfo);  

        // 3. Set attributes
        gl.vertexAttribPointer(programInfo.positionLocation, 3,
            gl.FLOAT, gl.FALSE, 6 * Float32Array.BYTES_PER_ELEMENT, 0);

        gl.vertexAttribPointer(programInfo.colorLocation, 3, 
            gl.FLOAT, gl.FALSE, 6 * Float32Array.BYTES_PER_ELEMENT, 
            3 * Float32Array.BYTES_PER_ELEMENT);

        gl.enableVertexAttribArray(programInfo.positionLocation);
        gl.enableVertexAttribArray(programInfo.colorLocation);

        // 4. Set uniforms
        gl.uniformMatrix4fv(
            programInfo.worldLocation, 
            gl.FALSE, 
            this.generateWorldMatrix(m4.identity())
        );
        
        // 5. Draw
        this.buffer.draw(gl);
    }

    rerender(gl, programInfo) {
        if (!this.#lastProgramInfo) {
            throw new Error("You need to render first!");
        }
        
        this.buffer.bind(gl, programInfo);
        gl.uniformMatrix4fv(
            programInfo.worldLocation, 
            gl.FALSE, 
            this.generateWorldMatrix(m4.identity())
        );
        this.buffer.draw(gl);
    }

    generateWorldMatrix(ancestorMatrix) {
        return m4.multiply(this.transformationMatrix, ancestorMatrix);
    }

    setColor(colors) {
        this.buffer.setColor(colors);
    }

    setTransformationMatrix() {
        if (!this.transformation) {
            throw new Error("Transformation should be defined first!");
        }

        let matrix = m4.identity();
        matrix = m4.multiply(matrix, this.invRotationCenter);
        matrix = m4.translate(
            matrix,
            this.transformation.translation[0],
            this.transformation.translation[1],
            this.transformation.translation[2]
        );
        matrix = m4.xRotate(matrix, this.transformation.rotation[0]);
        matrix = m4.yRotate(matrix, this.transformation.rotation[1]);
        matrix = m4.zRotate(matrix, this.transformation.rotation[2]);
        matrix = m4.scale(matrix, 
            this.transformation.scale[0], 
            this.transformation.scale[1], 
            this.transformation.scale[2]
            );
        matrix = m4.multiply(matrix, this.rotationCenter);
    
        this.transformationMatrix = matrix;
    }

    /* === Builder pattern === */
    setTranslation(translation) {
        this.transformation.translation = translation;
        this.setTransformationMatrix();
        return this;
    }
    
    setRotation(rotation) {
        rotation = [
            degToRad(rotation[0]),
            degToRad(rotation[1]),
            degToRad(rotation[2]),
        ]
        this.transformation.rotation = rotation;
        this.setTransformationMatrix();
        return this;
    }
    
    setScale(scale) {
        this.transformation.scale = scale;
        this.setTransformationMatrix();
        return this;
    }

    setRotationCenter(point) {
        this.rotationCenter = m4.translate(
            m4.identity(), 
            point[0], 
            point[1], 
            point[2]
        );
        this.invRotationCenter = m4.inverse(this.rotationCenter);
        return this;
    }

    /* === Transform and rerender === */
    translateTo(translation) {
        this.setTranslation(translation);
        this.rerender(this.#gl, this.#lastProgramInfo);
    }
    
    rotateTo(rotation) {
        this.setRotation(rotation);
        this.rerender(this.#gl, this.#lastProgramInfo);
    }
    
    scaleTo(scale) {
        this.setScale(scale);
        this.rerender(this.#gl, this.#lastProgramInfo);
    }
}