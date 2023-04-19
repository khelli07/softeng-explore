class Node {
    constructor(geo) {
        this.geo = geo;
        this.children = [];
    }

    appendChild(...child) {
        this.children.push(...child);
    }
    
    render(gl, programInfo) {
        this.geo.render(gl, programInfo);
        this.children.forEach(child => child.render(gl, programInfo));
    }

    rerender(gl, programInfo) {
        this.geo.rerender(gl, programInfo);
        this.children.forEach(child => child.rerender(gl, programInfo));
    }

    rotate(gl, programInfo, rotation) {
        this.geo.rotate(gl, programInfo, rotation);
        this.children.forEach(child => child.rotate(gl, programInfo, rotation));
    }
}