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

    render(gl, programInfo, ancestorMatrix) {
        if (!ancestorMatrix) {
            ancestorMatrix = m4.identity();
        }

        // 0. Save OpenGL state
        this.#gl = gl;
        this.#lastProgramInfo = programInfo;

        // 1. Use program
        gl.useProgram(programInfo.program);

        // 2. Set buffers and attributes
        this.buffer.bind(gl, programInfo);

        // 3. Set uniforms
        // World matrix
        gl.uniformMatrix4fv(programInfo.worldLocation, gl.FALSE, this.generateWorldMatrix(ancestorMatrix));

        // Model matrix
        let viewMatrix = m4.xRotation(degToRad(0));
        viewMatrix = m4.yRotate(viewMatrix, degToRad(0));
        viewMatrix = m4.zRotate(viewMatrix, degToRad(100));
        
        let radius = 1;
        viewMatrix = m4.translate(viewMatrix, 0, 0, radius);
        
        const cameraPosition = [
            viewMatrix[12],
            viewMatrix[13],
            viewMatrix[14],
        ];
        const up = [0, 1, 0];
        
        viewMatrix = m4.lookAt(cameraPosition, [0, 0, 0], up);
        viewMatrix = m4.inverse(viewMatrix);
        gl.uniformMatrix4fv(programInfo.viewLocation, gl.FALSE, viewMatrix);
        
        // Projection matrix
        let aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
        let zNear = 0.1;
        let zFar = 1000;
        let projectionMatrix = m4.perspective(degToRad(90), aspect, zNear, zFar);
        
        gl.uniformMatrix4fv(programInfo.projLocation, gl.FALSE, projectionMatrix);
        
        gl.uniform3fv(programInfo.cameraLocation, cameraPosition);
        gl.uniform1i(programInfo.textureLocation, 0);
        
        // 5. Draw
        this.buffer.draw(gl);
    }

    rerender(gl, programInfo, ancestorMatrix) {
        if (!this.#lastProgramInfo) {
            throw new Error("You need to render first!");
        }

        if (!ancestorMatrix) {
            ancestorMatrix = m4.identity();
        }
        
        this.buffer.bind(gl, programInfo);
        gl.uniformMatrix4fv(
            programInfo.worldLocation, 
            gl.FALSE, 
            this.generateWorldMatrix(ancestorMatrix)
        );
        this.buffer.draw(gl);
    }

    generateWorldMatrix(ancestorMatrix) {
        this.worldMatrix = m4.multiply(this.transformationMatrix, ancestorMatrix);
        return this.worldMatrix;
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

    rotate(rotation) {
        let matrix = m4.identity();
        matrix = m4.xRotate(matrix, rotation[0]);
        matrix = m4.yRotate(matrix, rotation[1]);
        matrix = m4.zRotate(matrix, rotation[2]);
        this.transformationMatrix = m4.multiply(matrix, this.transformationMatrix);
        
        if (this.#gl && this.#lastProgramInfo) {
            this.render(this.#gl, this.#lastProgramInfo);
        } else {
            this.rerender(this.#gl, this.#lastProgramInfo);
        }
    }
}