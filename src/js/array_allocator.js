import {api} from './api';

export default size => {
  const {inst} = api;
  const memory = inst.newArray(Float32Array, size, true)
  const array = inst.getArray(Float32Array, memory);
  array.__forWASM = memory;
  return array;
};
