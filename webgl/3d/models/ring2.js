let {r, g, b} = {r: 0.72, g:0.48, b: 0.22};

let innerRadius = 0.4;
let outerRadius = 0.5;

let innerZ, outerZ, innerX, outerX;
let upperOuterZ, upperOuterX, lowerOuterZ, lowerOuterX;
let upperInnerZ, upperInnerX, lowerInnerZ, lowerInnerX;
let upperOuterZ_, upperOuterX_;
let upperInnerZ_, upperInnerX_;

let sign, j;
let k = 0;
const vertices = [];
const indices = [];

for (let i = 0; i <= 355; i += 5) {
    if (i < 180) {
        r += 0.013;
        g += 0.013;
        b += 0.013;
    } else {
        r -= 0.013;
        g -= 0.013;
        b -= 0.013;
    }

    innerX = innerRadius * Math.sin(degToRad(i));
    innerZ = innerRadius * Math.cos(degToRad(i));

    outerX = outerRadius * Math.sin(degToRad(i));
    outerZ = outerRadius * Math.cos(degToRad(i));

    vertices.push(innerX, 0.1, innerZ, r, g, b); // 0
    vertices.push(outerX, 0.1, outerZ, r, g, b); // 1
    
    vertices.push(innerX, -0.1, innerZ, r, g, b); // 2
    vertices.push(outerX, -0.1, outerZ, r, g, b); // 3

    innerX = innerRadius * Math.sin(degToRad(i + 5));
    innerZ = innerRadius * Math.cos(degToRad(i + 5));

    outerX = outerRadius * Math.sin(degToRad(i + 5));
    outerZ = outerRadius * Math.cos(degToRad(i + 5));

    vertices.push(innerX, 0.1, innerZ, r, g, b); // 4
    vertices.push(outerX, 0.1, outerZ, r, g, b); // 5
    
    vertices.push(innerX, -0.1, innerZ, r, g, b); // 6
    vertices.push(outerX, -0.1, outerZ, r, g, b); // 7
    
    // indices.push(k, k+2, k+6, k+6, k+4, k);
    // indices.push(k, k+2, k+6, k+6, k+4, k);
    
    // indices.push(k+1, k+5, k+7, k+7, k+3, k+1);
    // indices.push(k+1, k+3, k+7, k+7, k+5, k+1);

    indices.push(k, k+4, k+5, k+5, k+1, k);
    indices.push(k, k+1, k+5, k+5, k+4, k);

    // indices.push(k+2, k+3, k+7, k+7, k+6, k+2);
    indices.push(k+2, k+6, k+7, k+7, k+3, k+2);
    
    k += 8;

    j = 0;
    upperOuterX = outerRadius * Math.sin(degToRad(i));
    upperOuterZ = outerRadius * Math.cos(degToRad(i));
    upperOuterX_ = outerRadius * Math.sin(degToRad(i + 5));
    upperOuterZ_ = outerRadius * Math.cos(degToRad(i + 5));
    for (let h = -0.1; h <= 0.1; h += 0.02) {     
        vertices.push(upperOuterX, h, upperOuterZ, r, g, b); // 0
        vertices.push(upperOuterX_, h, upperOuterZ_, r, g, b); // 1

        if (h < 0) {
            j += 1;
        } else if (h > 0) {
            j -= 1;
        }
        
        lowerOuterX = outerRadius * Math.sin(degToRad(i)) * (1+(j/25));
        lowerOuterZ = outerRadius * Math.cos(degToRad(i)) * (1+(j/25));
        vertices.push(lowerOuterX, h + 0.02, lowerOuterZ, r, g, b); // 2

        upperOuterX = lowerOuterX
        upperOuterZ = lowerOuterZ
        
        lowerOuterX = outerRadius * Math.sin(degToRad(i + 5)) * (1+(j/25));
        lowerOuterZ = outerRadius * Math.cos(degToRad(i + 5)) * (1+(j/25));
        vertices.push(lowerOuterX, h + 0.02, lowerOuterZ, r, g, b); // 3
        
        upperOuterX_ = lowerOuterX
        upperOuterZ_ = lowerOuterZ

        indices.push(k, k+2, k+3, k+3, k+1, k);
        indices.push(k, k+1, k+3, k+3, k+2, k);
   
        k += 4;
    }

    j = 1;
    upperInnerX = innerRadius * Math.sin(degToRad(i));
    upperInnerZ = innerRadius * Math.cos(degToRad(i));
    upperInnerX_ = innerRadius * Math.sin(degToRad(i + 5));
    upperInnerZ_ = innerRadius * Math.cos(degToRad(i + 5));
    for (let h = -0.1; h <= 0.1; h += 0.02) {     
        vertices.push(upperInnerX, h, upperInnerZ, r, g, b); // 0
        vertices.push(upperInnerX_, h, upperInnerZ_, r, g, b); // 1

        if (h < 0) {
            j += 1;
        } else if (h > 0) {
            j -= 1;
        }
        
        lowerInnerX = innerRadius * Math.sin(degToRad(i)) * (1+(j/25));
        lowerInnerZ = innerRadius * Math.cos(degToRad(i)) * (1+(j/25));
        vertices.push(lowerInnerX, h + 0.02, lowerInnerZ, r, g, b); // 2

        upperInnerX = lowerInnerX
        upperInnerZ = lowerInnerZ
        
        lowerInnerX = innerRadius * Math.sin(degToRad(i + 5)) * (1+(j/25));
        lowerInnerZ = innerRadius * Math.cos(degToRad(i + 5)) * (1+(j/25));
        vertices.push(lowerInnerX, h + 0.02, lowerInnerZ, r, g, b); // 3
        
        upperInnerX_ = lowerInnerX
        upperInnerZ_ = lowerInnerZ
        
        indices.push(k, k+1, k+3, k+3, k+2, k);
        indices.push(k, k+2, k+3, k+3, k+1, k);
   
        k += 4;
    }
}