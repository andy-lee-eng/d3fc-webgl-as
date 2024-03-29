import {api} from './api';

export default () => {
  let pixelX = 1;
  let pixelY = 1;
  let lineWidth = 0;
  let callback = () => {};

  const circles = (points, totalSegments) => {
    const {inst} = api;

    let in_buffer;
    let out_buffer;
    let edge_buffer;
    try {
      out_buffer = inst.newArray(Float32Array, totalSegments * 6, true);
      in_buffer = points.__forWASM ? points.__forWASM : inst.newArray(points);
      inst.circles(in_buffer, totalSegments, pixelX, pixelY, out_buffer);

      let edgeArray = null;
      if (lineWidth > 0) {
        edge_buffer = inst.newArray(Float32Array, totalSegments * 6, true);
        inst.edges(out_buffer, lineWidth, pixelX, pixelY, edge_buffer);
        edgeArray = inst.getArray(Float32Array, edge_buffer);
      }

      callback(inst.getArray(Float32Array, out_buffer), edgeArray);
    } finally {
      if (in_buffer) inst.freeArray(in_buffer);
      if (out_buffer) inst.freeArray(out_buffer);
      if (edge_buffer) inst.freeArray(edge_buffer);
    }
  };

  circles.pixelX = (...args) => {
    if (!args.length) {
        return pixelX;
    }
    pixelX = args[0];
    return circles;
  };

  circles.pixelY = (...args) => {
    if (!args.length) {
        return pixelY;
    }
    pixelY = args[0];
    return circles;
  };

  circles.lineWidth = (...args) => {
    if (!args.length) {
        return lineWidth;
    }
    lineWidth = args[0];
    return circles;
  };  

  circles.callback = (...args) => {
    if (!args.length) {
        return callback;
    }
    callback = args[0];
    return circles;
  };

  return circles;
};
