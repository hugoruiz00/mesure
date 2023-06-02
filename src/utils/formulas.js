
export const calculateArea = (shape) => {
    let total = 0;
    console.log(shape);
    shape.forEach((vertex, index) => {
      const nextIndex = (index==shape.length-1) ? 0: index+1;
      total+= vertex.position.x * shape[nextIndex].position.y;
      total-= vertex.position.y * shape[nextIndex].position.x;
    });

    return Math.abs(total/2);
}

export const calculateDistance = (x1, y1, x2, y2) => {
    const distance = Math.sqrt((x2 - x1)**2 + (y2 - y1)**2);
    return distance;
}

export const getAdjustedShapeDimensions = (shape, scale) => {
    const shapeAux = [...shape];
    for (let index = 1; index < shapeAux.length; index++) {
      const nextIndex = index==shapeAux.length-1 ? 0 : index+1;
      const prevIndex = index==0 ? shapeAux.length-1 : index-1;
      const prevVertex = shapeAux[prevIndex];
      const currentVertex = shapeAux[index];
      const nextVertex = shapeAux[nextIndex];

      if(coordinateExists(prevVertex.position, nextVertex.position, prevVertex.sideDistance/scale, currentVertex.sideDistance/scale)){
        const xCoordinate = getXCoordinate(prevVertex.position, nextVertex.position, currentVertex.position, prevVertex.sideDistance/scale, currentVertex.sideDistance/scale);
        const yCoordinate = getYCoordinate(prevVertex.position, nextVertex.position, currentVertex.position, prevVertex.sideDistance/scale, currentVertex.sideDistance/scale);
        shapeAux[index].position = {x: xCoordinate, y: yCoordinate};
      }else{
        console.log("No es posible ajustar: "+index);
      }
    }
    return shapeAux;
}

export const getXCoordinate = (A, B, C, dAC, dBC) => {
    const dAB = calculateDistance(A.x, A.y, B.x, B.y);
    const firstResult = (A.x+B.x)/2 + ((B.x-A.x)*(dAC**2-dBC**2)) / (2*(dAB**2));
    const secondResult = 2 * ((A.y-B.y) / dAB**2) * areaWithHeronFormula(dAB, dBC, dAC);
    const Cx1 = firstResult + secondResult;
    const Cx2 = firstResult - secondResult;
    return getNearestValue(C.x, Cx1, Cx2);
}

export const getYCoordinate = (A, B, C, dAC, dBC) => {
    const dAB = calculateDistance(A.x, A.y, B.x, B.y);
    const firstResult = (A.y+B.y)/2 + ((B.y-A.y)*(dAC**2-dBC**2)) / (2*(dAB**2));
    const secondResult = 2 * ((A.x-B.x) / dAB**2) * areaWithHeronFormula(dAB, dBC, dAC);
    const Cy1 = firstResult - secondResult;
    const Cy2 = firstResult + secondResult;
    return getNearestValue(C.y, Cy1, Cy2);
}

export const coordinateExists = (A, B, dAC, dBC) => {
    const dAB = calculateDistance(A.x, A.y, B.x, B.y);
    return (((dAC + dBC) >= dAB) && (dAB >= Math.abs(dAC - dBC)));
}

const areaWithHeronFormula = (dAB, dBC, dAC) => {
    const area = Math.sqrt((dAB**2 + dAC**2 + dBC**2)**2 - 2 * (dAB**4 + dAC**4 + dBC**4)) / 4;
    return area;
}

const getNearestValue = (targetNumber, num1, num2) => {
    return (Math.abs(targetNumber - num1) < Math.abs(targetNumber - num2)) ? num1 : num2;
}