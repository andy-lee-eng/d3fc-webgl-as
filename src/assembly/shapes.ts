export function shapes(points: Float32Array, shape: Float32Array, pixelX: f32, pixelY: f32): Float32Array {
  let trianglesPerPoint = shape.length / 2 - 1;
  let totalSegments = (points.length / 3) * trianglesPerPoint;
  let triangles = new Float32Array(totalSegments * 6);

  let index: i32 = 0;
  let target: i32 = 0;

  while(index < points.length) {
    let x = points[index++];
    let y = points[index++];
    let size = points[index++];

    let sizeX = size * pixelX;
    let sizeY = size * pixelY;

    for (let j = 0; j < trianglesPerPoint; j++) {
      let shapePos = j * 2;
      triangles[target++] = x;
      triangles[target++] = y;
      triangles[target++] = x + shape[shapePos++] * sizeX;
      triangles[target++] = y + shape[shapePos++] * sizeY;

      triangles[target++] = x + shape[shapePos++] * sizeX;
      triangles[target++] = y + shape[shapePos++] * sizeY;
    }
  }

  return triangles;
}
