export function circles(points: Float32Array, totalSegments: i32, pixelX: f32, pixelY: f32, triangles: Float32Array): void {
  let index: i32 = 0;
  let target: i32 = 0;

  while(index < points.length) {
    let x = points[index++];
    let y = points[index++];
    let size = points[index++];
    let segments = points[index++];

    let last_x = x;
    let last_y = y + size * pixelY;

    for(let j: f32 = 0; j < segments; j++) {
      triangles[target++] = x;
      triangles[target++] = y;
      triangles[target++] = last_x;
      triangles[target++] = last_y;

      let angle: f32 = 2 * (j+1) * Mathf.PI / segments;
      last_x = x + Mathf.sin(angle) * size * pixelX;
      last_y = y + Mathf.cos(angle) * size * pixelY;

      triangles[target++] = last_x;
      triangles[target++] = last_y;
    }
  }
}
