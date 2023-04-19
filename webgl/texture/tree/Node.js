class Node {
    constructor(geo) {
        this.geo = geo;
        this.children = [];
    }

    appendChild(...child) {
        this.children.push(...child);
    }
    
    render(gl, programInfo, ancestorMatrix) {
        this.geo.render(gl, programInfo, ancestorMatrix);
        this.children.forEach(child => child.render(gl, programInfo, this.geo.worldMatrix));
    }

    rerender(gl, programInfo, ancestorMatrix) {
        this.geo.rerender(gl, programInfo, ancestorMatrix);
        this.children.forEach(child => child.rerender(gl, programInfo, this.geo.worldMatrix));
    }

    rotate(gl, programInfo, rotation) {
        this.geo.rotate(rotation);
        this.children.forEach(child => child.rotate(gl, programInfo, rotation));
    }
}