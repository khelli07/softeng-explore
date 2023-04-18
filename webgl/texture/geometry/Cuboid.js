class Cuboid extends Geometry {
    constructor(length, width, height, transformation) {
        super(new Buffer(), transformation);
        
        this.length = length;
        this.width = width;
        this.height = height;

        this.generateVertices(this.length, this.width, this.height);
        this.generateIndices();
    }

    generateVertices(l, w, h) {
        this.buffer.vertices = [
            w, l, h, 0.7, 0, 0,
            -w, l, h, 0.7, 0, 0,
            -w, -l, h, 0.7, 0, 0,
            -w, -l, h, 0.7, 0, 0,
            w, -l, h, 0.7, 0, 0,
            w, l, h, 0.7, 0, 0,
            
            w, l, -h, 0, 0.7, 0,
            w, -l, -h, 0, 0.7, 0,
            -w, -l, -h, 0, 0.7, 0,
            -w, -l, -h, 0, 0.7, 0,
            -w, l, -h, 0, 0.7, 0,
            w, l, -h, 0, 0.7, 0,
            
            w, l, -h, 0, 0, 0.7,
            -w, l, -h, 0, 0, 0.7,
            -w, l, h, 0, 0, 0.7,
            -w, l, h, 0, 0, 0.7,
            w, l, h, 0, 0, 0.7,
            w, l, -h, 0, 0, 0.7,
            
            w, -l, -h, 0.7, 0.7, 0,
            w, -l, h, 0.7, 0.7, 0,
            -w, -l, h, 0.7, 0.7, 0,
            -w, -l, h, 0.7, 0.7, 0,
            -w, -l, -h, 0.7, 0.7, 0,
            w, -l, -h, 0.7, 0.7, 0,

            w, l, -h, 0.7, 0, 0.7,
            w, l, h, 0.7, 0, 0.7,
            w, -l, h, 0.7, 0, 0.7,
            w, -l, h, 0.7, 0, 0.7,
            w, -l, -h, 0.7, 0, 0.7,
            w, l, -h, 0.7, 0, 0.7,
            
            -w, l, -h, 0, 0.7, 0.7,
            -w, -l, -h, 0, 0.7, 0.7,
            -w, -l, h, 0, 0.7, 0.7,
            -w, -l, h, 0, 0.7, 0.7,
            -w, l, h, 0, 0.7, 0.7,
            -w, l, -h, 0, 0.7, 0.7,
        ]
    }

    generateIndices() {
        this.buffer.indices = [...Array(36).keys()];
    }
}