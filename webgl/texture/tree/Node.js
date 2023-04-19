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

    export(name, json) {
        let root = false;
        if (!json) {
            root = true;
            json = {
                num_pts: 0,
                pts: [],
                num_edge: 0,
                edge: [],
            };
        }

        json = this.generateEdge(json);
        // let childrenNumbers = [];
        this.children.forEach(child => 
            json = child.export(name, json)
        );

        if (root) {
            // this.exportData(name, json);
            console.log(json);
        }

        return json;
    }

    generateEdge(json) {
        const edge = {
            name: json.num_edge.toString(),
            num_face: 0,
            topology: []
        }

        let positions = this.geo.buffer.positions;
        let j = 0;
        let result;
        let transposeTransform = m4.transpose(this.geo.transformationMatrix);
        for (let i = 0; i < positions.length; i += 3) {
            if (j != 3 && j != 5) {
                result = getTransformedPoint(
                    transposeTransform,
                    [positions[i], positions[i + 1], positions[i + 2], 1]
                );
                json.pts.push([result[0], result[1], result[2]]);
            } 
            
            if (j == 5) {
                edge.topology.push([
                    json.num_pts, 
                    json.num_pts + 1, 
                    json.num_pts + 2,
                    json.num_pts + 3,
                ]);
                json.num_pts += 4;
            }
            
            j = (j + 1) % 6;
        }

        json.num_edge += 1;
        edge.num_face = edge.topology.length;
        json.edge.push(edge);
        return json;
    }
    
    exportData(name, json) {
        const element = document.createElement('a');
    
        element.setAttribute('href', 'data:text/json, ' + encodeURIComponent(JSON.stringify(json)));
        element.setAttribute('download', `${name}.json`);
    
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
}