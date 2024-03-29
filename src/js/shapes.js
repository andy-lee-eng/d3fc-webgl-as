import {api} from './api';

export default () => {
  let pixelX = 1;
  let pixelY = 1;
  let lineWidth = 0;
  let shape = [];
  let callback = () => {};

  const shapes = (points) => {
    const {inst} = api;

    let in_buffer;
    let shape_buffer;
    let out_buffer;
    let edge_buffer;
    try {
      const totalSegments = (points.length / 3) * (shape.length / 2 - 1);

      out_buffer = inst.newArray(Float32Array, totalSegments * 6, true);
      in_buffer = points.__forWASM ? points.__forWASM : inst.newArray(points);
      shape_buffer = inst.newArray(shape);
      inst.shapes(in_buffer, shape_buffer, pixelX, pixelY, out_buffer);

      let edgeArray = null;
      if (lineWidth > 0) {
        edge_buffer = inst.newArray(Float32Array, totalSegments * 6, true);
        inst.edges(out_buffer, lineWidth, pixelX, pixelY, edge_buffer);
        edgeArray = inst.getArray(Float32Array, edge_buffer);
      }

      callback(inst.getArray(Float32Array, out_buffer), edgeArray);
    } finally {
      if (in_buffer) inst.freeArray(in_buffer);
      if (shape_buffer) inst.freeArray(shape_buffer);
      if (out_buffer) inst.freeArray(out_buffer);
      if (edge_buffer) inst.freeArray(edge_buffer);
    }
  };

  shapes.pixelX = (...args) => {
    if (!args.length) {
        return pixelX;
    }
    pixelX = args[0];
    return shapes;
  };

  shapes.pixelY = (...args) => {
    if (!args.length) {
        return pixelY;
    }
    pixelY = args[0];
    return shapes;
  };

  shapes.lineWidth = (...args) => {
    if (!args.length) {
        return lineWidth;
    }
    lineWidth = args[0];
    return shapes;
  };  

  shapes.shape = (...args) => {
    if (!args.length) {
        return shape;
    }
    shape = args[0];
    return shapes;
  };

  shapes.callback = (...args) => {
    if (!args.length) {
        return callback;
    }
    callback = args[0];
    return shapes;
  };

  return shapes;
};
