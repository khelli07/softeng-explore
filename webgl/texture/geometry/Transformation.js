class Transformation {
    constructor() {
        this.translation = [0, 0, 0],
        this.rotation = [0, 0, 0],
        this.scale = [1, 1, 1]
    }

    clone() {
        let cloned = new Transformation();
        cloned.translation = this.translation;
        cloned.rotation = this.rotation;
        cloned.scale = this.scale;
        return cloned;
    }
}