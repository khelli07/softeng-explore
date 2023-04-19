class Cuboid extends Geometry {
    constructor(length, width, height, transformation) {
        super(new Buffer(), transformation);
        
        this.length = length;
        this.width = width;
        this.height = height;

        this.generatePositions(this.length, this.width, this.height);
        this.generateIndices();
        this.generateDefaultColors();
        this.generateNormals();

        if (this.buffer.positions.length != this.buffer.colors.length) {
            throw new Error("Positions and colors should have the same length!");
        }
    }

    generatePositions(l, w, h) {
        this.buffer.positions = [
            w, l, h, 
            -w, l, h, 
            -w, -l, h, 
            -w, -l, h, 
            w, -l, h, 
            w, l, h, 
            
            w, l, -h, 
            w, -l, -h, 
            -w, -l, -h, 
            -w, -l, -h, 
            -w, l, -h, 
            w, l, -h, 
            
            w, l, -h, 
            -w, l, -h, 
            -w, l, h, 
            -w, l, h, 
            w, l, h, 
            w, l, -h, 
            
            w, -l, -h,  
            w, -l, h,  
            -w, -l, h,  
            -w, -l, h,  
            -w, -l, -h,  
            w, -l, -h,  

            w, l, -h,  
            w, l, h,  
            w, -l, h,  
            w, -l, h,  
            w, -l, -h,  
            w, l, -h,  
            
            -w, l, -h,  
            -w, -l, -h,  
            -w, -l, h,  
            -w, -l, h,  
            -w, l, h,  
            -w, l, -h,  
        ];
    }

    generateDefaultColors() {
        this.buffer.colors = [
            0.7, 0, 0,
            0.7, 0, 0,
            0.7, 0, 0,
            0.7, 0, 0,
            0.7, 0, 0,
            0.7, 0, 0,
            
            0, 0.7, 0,
            0, 0.7, 0,
            0, 0.7, 0,
            0, 0.7, 0,
            0, 0.7, 0,
            0, 0.7, 0,
            
            0, 0, 0.7,
            0, 0, 0.7,
            0, 0, 0.7,
            0, 0, 0.7,
            0, 0, 0.7,
            0, 0, 0.7,
            
            0.7, 0.7, 0,
            0.7, 0.7, 0,
            0.7, 0.7, 0,
            0.7, 0.7, 0,
            0.7, 0.7, 0,
            0.7, 0.7, 0,

            0.7, 0, 0.7,
            0.7, 0, 0.7,
            0.7, 0, 0.7,
            0.7, 0, 0.7,
            0.7, 0, 0.7,
            0.7, 0, 0.7,
            
            0, 0.7, 0.7,
            0, 0.7, 0.7,
            0, 0.7, 0.7,
            0, 0.7, 0.7,
            0, 0.7, 0.7,
            0, 0.7, 0.7,
        ];
    }

    generateIndices() {
        this.buffer.indices = [...Array(36).keys()];
    }

    generateNormals() {
        this.buffer.normals = [
            0, 0, 1, 
            0, 0, 1, 
            0, 0, 1,
            0, 0, 1, 
            0, 0, 1, 
            0, 0, 1,

            0, 0, -1, 
            0, 0, -1, 
            0, 0, -1,
            0, 0, -1, 
            0, 0, -1, 
            0, 0, -1,

            0, 1, 0, 
            0, 1, 0, 
            0, 1, 0,
            0, 1, 0, 
            0, 1, 0, 
            0, 1, 0,

            0, -1, 0, 
            0, -1, 0, 
            0, -1, 0,
            0, -1, 0, 
            0, -1, 0, 
            0, -1, 0,

            1, 0, 0, 
            1, 0, 0, 
            1, 0, 0,
            1, 0, 0, 
            1, 0, 0, 
            1, 0, 0,

            -1, 0, 0, 
            -1, 0, 0, 
            -1, 0, 0,
            -1, 0, 0, 
            -1, 0, 0, 
            -1, 0, 0,
        ];
    }
}