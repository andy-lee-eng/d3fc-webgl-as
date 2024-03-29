export function edges(positions: Float32Array, lineWidth: f32, pixelX: f32, pixelY: f32, edges: Float32Array): void {
  for(let n = 0; n < positions.length; n += 6) {
    let dist1 = pixelDist(positions[n], positions[n + 1], positions[n + 2], positions[n + 3], pixelX, pixelY);
    let dist2 = pixelDist(positions[n], positions[n + 1], positions[n + 4], positions[n + 5], pixelX, pixelY);

    let diff = Mathf.sqrt(dist1 / dist2);
    
    let lw1 = lineWidth * diff;
    let lw2 = lineWidth / diff;

    let r1 = (dist1 - lw1);
    let r2 = (dist2 - lw2);

    if (diff < 0) {
      r1 = 0;
      r2 = 0;
      dist1 = 0;
      dist2 = 0;
    }

    edges[n] = 0;
    edges[n + 1] = (r1 + r2) / 2;
    edges[n + 2] = dist1;
    edges[n + 3] = r1;
    edges[n + 4] = dist2;
    edges[n + 5] = r2;
  }
}

function pixelDist(x1: f32, y1: f32, x2: f32, y2: f32, pixelX: f32, pixelY: f32): f32 {
  let xd: f32 = (x2 - x1) / pixelX;
  let yd: f32 = (y2 - y1) / pixelY;
  return Mathf.sqrt(xd * xd + yd * yd);
}
