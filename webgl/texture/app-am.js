const vertexShaderSource = `
attribute vec4 vertPosition;
attribute vec3 vertColor;
attribute vec3 vertNormal;

uniform mat4 worldMatrix;
uniform mat4 viewMatrix;
uniform mat4 projMatrix;

varying vec3 fragColor;
 
void main() {
    fragColor = vertColor;
    // gl_Position = projMatrix * viewMatrix * worldMatrix * vertPosition;
    gl_Position = worldMatrix * vertPosition;
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
	// gl.enable(gl.CULL_FACE);
	// gl.frontFace(gl.CCW);
	// gl.cullFace(gl.BACK);

    // Initialize shaders and program
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER,fragmentShaderSource);
    const program = createProgram(gl, vertexShader, fragmentShader);
    gl.useProgram(program);    

    // Create program attribute
    const programInfo = {
        program: program,
        positionLocation: gl.getAttribLocation(program, "vertPosition"),
        colorLocation: gl.getAttribLocation(program, "vertColor"),
        
        worldLocation: gl.getUniformLocation(program, "worldMatrix"),
        viewLocation: gl.getUniformLocation(program, "viewMatrix"),
        projLocation: gl.getUniformLocation(program, "projMatrix"),
        
        positionBuffer: gl.createBuffer(),
        indexBuffer: gl.createBuffer(),
        colorBuffer: gl.createBuffer(),

        // cameraLocation: gl.getUniformLocation(program, "cameraPosition"),
        // normalLocation: gl.getAttribLocation(program, "vertNormal"),
        // normalBuffer: gl.createBuffer(),
        // textureLocation: gl.getUniformLocation(program, "texture"),
        // textureType: gl.TEXTURE_CUBE_MAP,
    }

    // Create object
    let trans = new Transformation();

    let head = new Node(new Cuboid(0.1, 0.15, 0.125, trans)
        .setTranslation([0, 0.5, 0]));

    let torso = new Node(new Cuboid(0.25, 0.2, 0.075, trans)
        .setTranslation([0.0, 0.15, 0.0])
        );

    let lfoot = new Node(new Cuboid(0.4, 0.03, 0.03, trans)
        .setTranslation([0.1, -0.45, 0])
        .setRotationCenter([-0.1, -0.45, 0])
        );

    let rfoot = new Node(new Cuboid(0.4, 0.03, 0.03, trans)
        .setTranslation([-0.1, -0.45, 0.0])
        .setRotation([0, 0, 0])
        .setRotationCenter([-0.1, -0.45, 0])
        );

    let larm = new Node(new Cuboid(0.4, 0.03, 0.03, trans)
        .setTranslation([0.2, -0.05, 0])
        .setRotation([0, 0, 10])
        .setRotationCenter([-0.25, -0.4, 0])
        );

    let rarm = new Node(new Cuboid(0.4, 0.03, 0.03, trans)
        .setTranslation([-0.2, -0.05, 0.0])
        .setRotation([0, 0, -10])
        .setRotationCenter([0.25, -0.4, 0])
        );

    head.appendChild(torso);
    torso.appendChild(larm, rarm, lfoot, rfoot);

    head.render(gl, programInfo);
    // rarm.render(gl, programInfo);

    let angleArm = 0;
    let angleFoot = 0;
    let multArm = 1;
    let multFoot = 1;
    let bodyAngle = 0;
    let deltaBody = 0.015;
    const loop = function () {
        gl.clearColor(0.75, 0.85, 0.8, 1.0);
	    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        bodyAngle = (bodyAngle + deltaBody) % 360;
        head.rotate(gl, programInfo, [0, deltaBody, 0]);
        
        angleArm = (angleArm + 0.75 * multArm);
        if (angleArm > 45) {
            multArm = -1;
        } else if (angleArm < -45) {
            multArm = 1;
        }

        angleFoot = (angleFoot + 0.5 * multFoot);
        if (angleFoot > 30) {
            multFoot = -1;
        } else if (angleFoot < -30) {
            multFoot = 1;
        }

        rarm.geo.setRotation([angleArm, 0, 0]);
        rarm.geo.rotate(gl, programInfo,[0, bodyAngle, 0]);

        larm.geo.setRotation([-angleArm, 0, 0]);
        larm.geo.rotate(gl, programInfo,[0, bodyAngle, 0]);

        rfoot.geo.setRotation([-angleFoot, 0, 0]);
        rfoot.geo.rotate(gl, programInfo,[0, bodyAngle, 0]);

        lfoot.geo.setRotation([angleFoot, 0, 0]);
        lfoot.geo.rotate(gl, programInfo,[0, bodyAngle, 0]);
        
        requestAnimationFrame(loop);
	};
	requestAnimationFrame(loop);
};

main();
