let json = {}

json["vertices"] = [];
json["colors"] = [];
json["normal"] = [];

let i = 0;
let count = 0;
let side = [];
for (let index of indices){
    i = index * 3;

    side.push([vertices[i], vertices[i+1], vertices[i+2]]);
    
    count++;
    if (count == 6) {
        // json["colors"].push([vertices[i+3], vertices[i+4], vertices[i+5]]);
        json["vertices"].push(side.slice());
        json["normal"].push(vec3.cross(vec3.subtract(side[1], side[0]), vec3.subtract(side[2], side[0])));

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

json["colors"] = "#FFFFFF";
console.log(json["vertices"].length);
console.log(json["colors"].length);

exportData("cube", json);
