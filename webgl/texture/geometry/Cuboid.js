class Cuboid extends Geometry {
    constructor(length, width, height, transformation) {
        super({
            vertices: [],
            indices: [],
            // textures: [],
        }, transformation);
        
        this.length = length;
        this.width = width;
        this.height = height;

        this.generateVertices(this.length, this.width, this.height);
        this.generateIndices();
    }

    generateVertices(l, w, h) {
        this.vertices = [
            l, h, w, 0.7, 0, 0,
            -l, h, w, 0.7, 0, 0,
            -l, -h, w, 0.7, 0, 0,
            -l, -h, w, 0.7, 0, 0,
            l, -h, w, 0.7, 0, 0,
            l, h, w, 0.7, 0, 0,
            
            l, h, -w, 0, 0.7, 0,
            l, -h, -w, 0, 0.7, 0,
            -l, -h, -w, 0, 0.7, 0,
            -l, -h, -w, 0, 0.7, 0,
            -l, h, -w, 0, 0.7, 0,
            l, h, -w, 0, 0.7, 0,
            
            l, h, -w, 0, 0, 0.7,
            -l, h, -w, 0, 0, 0.7,
            -l, h, w, 0, 0, 0.7,
            -l, h, w, 0, 0, 0.7,
            l, h, w, 0, 0, 0.7,
            l, h, -w, 0, 0, 0.7,
            
            l, -h, -w, 0.7, 0.7, 0,
            l, -h, w, 0.7, 0.7, 0,
            -l, -h, w, 0.7, 0.7, 0,
            -l, -h, w, 0.7, 0.7, 0,
            -l, -h, -w, 0.7, 0.7, 0,
            l, -h, -w, 0.7, 0.7, 0,

            l, h, -w, 0.7, 0, 0.7,
            l, h, w, 0.7, 0, 0.7,
            l, -h, w, 0.7, 0, 0.7,
            l, -h, w, 0.7, 0, 0.7,
            l, -h, -w, 0.7, 0, 0.7,
            l, h, -w, 0.7, 0, 0.7,
            
            -l, h, -w, 0, 0.7, 0.7,
            -l, -h, -w, 0, 0.7, 0.7,
            -l, -h, w, 0, 0.7, 0.7,
            -l, -h, w, 0, 0.7, 0.7,
            -l, h, w, 0, 0.7, 0.7,
            -l, h, -w, 0, 0.7, 0.7,
        ]
    }

    generateIndices() {
        this.indices = [
            0, 1, 2, 
            3, 4, 5, 
            6, 7, 8, 
            9, 10, 11, 
            12, 13, 14, 
            15, 16, 17, 
            18, 19, 20, 
            21, 22, 23, 
            24, 25, 26, 
            27, 28, 29, 
            30, 31, 32, 
            33, 34, 35
        ]
    }
}