let json = {}

json["vertices"] = [];
json["colors"] = [];
json["normal"] = [];

function componentToHex(c) {
    c = Math.round(c * 255);
    let hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

let i = 0;
let count = 0;
let side = [];
for (let index of indices){
    i = index * 6;

    side.push([vertices[i], vertices[i+1], vertices[i+2]]);
    
    count++;
    if (count == 6) {
        json["colors"].push(rgbToHex(vertices[i+3], vertices[i+4], vertices[i+5]));
        json["vertices"].push(side.slice());
        json["normal"].push([0, 0, 1]);

        count = 0;
        side = [];
    }
}

function exportData(name, json) {
    const element = document.createElement('a');

    element.setAttribute('href', 'data:text/json, ' + encodeURIComponent(JSON.stringify(json)));
    element.setAttribute('download', `${name}.json`);

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

console.log(json["vertices"].length);
console.log(json["colors"].length);

exportData("pyramid", json);
