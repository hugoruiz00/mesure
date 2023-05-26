
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

export const getXCoordinate = (xA, xB, yA, yB, dAB, dAC, dBC) => {
    //const dBC = calculateDistance(xA, yA, xB, yB);
    const firstResult = (xA+xB)/2 + ((xB-xA)*(dAC**2-dBC**2)) / (2*(dAB**2));
    const secondResult = 2 * ((yA-yB) / dAB**2) * areaWithHeronFormula(dAB, dBC, dAC);
    const xC1 = firstResult + secondResult;
    const xC2 = firstResult - secondResult;
    return xC1;
}

export const getYCoordinate = (xA, xB, yA, yB, dAB, dAC, dBC) => {
    //const dBC = calculateDistance(xA, yA, xB, yB);
    const firstResult = (yA+yB)/2 + ((yB-yA)*(dAC**2-dBC**2)) / (2*(dAB**2));
    const secondResult = 2 * ((xA-xB) / dAB**2) * areaWithHeronFormula(dAB, dBC, dAC);
    const yC1 = firstResult - secondResult;
    const yC2 = firstResult + secondResult;
    return yC1;
}

export const areaWithHeronFormula = (dAB, dBC, dAC) => {
    const area = Math.sqrt((dAB**2 + dAC**2 + dBC**2)**2 - 2 * (dAB**4 + dAC**4 + dBC**4)) / 4;
    return area;
}