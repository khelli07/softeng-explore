class HollowCuboid extends Geometry {
    constructor(
        length, 
        width, 
        height, 
        thickness, 
        transformation
    ) {
        super(new Buffer(), transformation);
        
        this.length = length;
        this.width = width;
        this.height = height;
        this.thickness = thickness;

        this.generateVertices(this.length, this.width, this.height, this.thickness);
        this.generateIndices();
    }

    generateVertices(l, w, h, t) {
        let {r, g, b} = {r: 0.2, g: 0.7, b: 0.2}
        this.buffer.vertices = [
        ]
    }

    generateIndices() {
        this.buffer.indices = [
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