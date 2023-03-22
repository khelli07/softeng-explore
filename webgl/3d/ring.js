let {r, g, b} = {r: 0.7, g:0.5, b: 0.1};

let innerRadius = 0.35;
let outerRadius = 0.5;

let innerZ, outerZ, innerX, outerX;
let k = 0;
const vertices = [];
const indices = [];
for (let i = 0; i <= 355; i += 5) {
    innerX = innerRadius * Math.sin(degToRad(i));
    innerZ = innerRadius * Math.cos(degToRad(i));

    outerX = outerRadius * Math.sin(degToRad(i));
    outerZ = outerRadius * Math.cos(degToRad(i));

    vertices.push(innerX, 0.25, innerZ, r+0.4, g+0.4, b+0.4); // 0
    vertices.push(outerX, 0.25, outerZ, r, g, b); // 1
    
    vertices.push(innerX, -0.25, innerZ, r+0.4, g+0.4, b+0.4); // 2
    vertices.push(outerX, -0.25, outerZ, r, g, b); // 3

    innerX = innerRadius * Math.sin(degToRad(i + 5));
    innerZ = innerRadius * Math.cos(degToRad(i + 5));

    outerX = outerRadius * Math.sin(degToRad(i + 5));
    outerZ = outerRadius * Math.cos(degToRad(i + 5));

    vertices.push(innerX, 0.25, innerZ, r+0.4, g+0.4, b+0.4); // 4
    vertices.push(outerX, 0.25, outerZ, r, g, b); // 5
    
    vertices.push(innerX, -0.25, innerZ, r+0.4, g+0.4, b+0.4); // 6
    vertices.push(outerX, -0.25, outerZ, r, g, b); // 7
    
    indices.push(k, k+4, k+6, k+6, k+2, k);
    indices.push(k, k+2, k+6, k+6, k+4, k);
    indices.push(k+1, k+5, k+7, k+7, k+3, k+1);
    indices.push(k+1, k+3, k+7, k+7, k+5, k+1);
    indices.push(k, k+4, k+5, k+5, k+1, k);
    indices.push(k+2, k+3, k+7, k+7, k+6, k+2);
    
    k += 8;
}