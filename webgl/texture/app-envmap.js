const vertexShaderSource = `
attribute vec4 vertPosition;
attribute vec3 vertColor;
attribute vec3 vertNormal;

uniform mat4 worldMatrix;
uniform mat4 viewMatrix;
uniform mat4 projMatrix;

varying vec3 fragColor;
varying vec3 worldPosition;
varying vec3 worldNormal;

void main() {
    fragColor = vertColor;
    gl_Position = projMatrix * viewMatrix * worldMatrix * vertPosition;

    worldPosition = (worldMatrix * vertPosition).xyz;
    worldNormal = mat3(worldMatrix) * vertNormal;
}
`;

const fragmentShaderSource = `
precision mediump float; // best practice to specify this

varying vec3 fragColor;
varying vec3 worldPosition;
varying vec3 worldNormal;

uniform samplerCube texCube;
uniform vec3 cameraPosition;

void main() {
    vec3 worldNormal = normalize(worldNormal);
    vec3 eyeToSurface = normalize(worldPosition - cameraPosition);
    vec3 reflection = reflect(eyeToSurface, worldNormal);

    gl_FragColor = textureCube(texCube, reflection);
    // gl_FragColor = vec4(fragColor, 1.0);
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
    // gl.clearColor(1, 1, 1, 1.0);
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

    // Create program attribute
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);

    const programInfo = {
        program: program,
        
        positionLocation: gl.getAttribLocation(program, "vertPosition"),
        colorLocation: gl.getAttribLocation(program, "vertColor"),
        normalLocation: gl.getAttribLocation(program, "vertNormal"),
        textureLocation: gl.getUniformLocation(program, "texCube"),

        worldLocation: gl.getUniformLocation(program, "worldMatrix"),
        viewLocation: gl.getUniformLocation(program, "viewMatrix"),
        projLocation: gl.getUniformLocation(program, "projMatrix"),
        cameraLocation: gl.getUniformLocation(program, "cameraPosition"),
        
        positionBuffer: gl.createBuffer(),
        colorBuffer: gl.createBuffer(),
        indexBuffer: gl.createBuffer(),
        normalBuffer: gl.createBuffer(),
        textureBuffer: texture,

        textureType: gl.TEXTURE_CUBE_MAP,
    }

    // Load images
    const faceInfos = [
        {
          target: gl.TEXTURE_CUBE_MAP_POSITIVE_X, 
          url: 'assets/pos-x.jpg',
        },
        {
          target: gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 
          url: 'assets/neg-x.jpg',
        },
        {
          target: gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 
          url: 'assets/pos-y.jpg',
        },
        {
          target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 
          url: 'assets/neg-y.jpg',
        },
        {
          target: gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 
          url: 'assets/pos-z.jpg',
        },
        {
          target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 
          url: 'assets/neg-z.jpg',
        },
    ];

    faceInfos.forEach((faceInfo) => {
        const {target, url} = faceInfo;
        
        // Upload the canvas to the cubemap face.
        const level = 0;
        const internalFormat = gl.RGBA;
        const width = 512;
        const height = 512;
        const format = gl.RGBA;
        const type = gl.UNSIGNED_BYTE;
        
        // setup each face so it's immediately renderable
        gl.texImage2D(target, level, internalFormat, width, height, 0, format, type, null);
        
        // Asynchronously load an image
        const image = new Image();
        image.src = url;
        image.addEventListener('load', function() {
            gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
            gl.texImage2D(target, level, internalFormat, format, type, image);
            gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
        });
    });
    gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);

    let transform = new Transformation();
    const cb = new Cube(0.2, transform)
        .setTranslation([0.4, 0, 0]);
    const cb2 = new Cube(0.2, transform)
        .setTranslation([-0.4, 0, 0]);
    
    cb.render(gl, programInfo);
    cb2.render(gl, programInfo);
    
    let angle = 0;
    let rotation;
    const loop = function () {
        gl.clearColor(0.75, 0.85, 0.8, 1.0);
	    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        angle = performance.now() / 1000 / 6 * 2 * 180;
        cb.setRotation([angle, 0, 0]);
        cb.rerender(gl, programInfo);
        
        cb2.setRotation([0, angle, 0]);
        cb2.rerender(gl, programInfo);

        requestAnimationFrame(loop);
	};
	requestAnimationFrame(loop);
};

main();
