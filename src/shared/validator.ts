/**
 * @todo
 * @description 判断是否满足 VectorVertex 的类型
 * @param data 原始数据
 */
function isVectorVertex(data: any): data is VectorVertex {
  return data;
}

/**
 * @todo
 * @description 判断是否满足 VectorSegment 的类型
 * @param data 原始数据
 */
function isVectorSegment(data: any): data is VectorSegment {
  return data;
}

/**
 * @todo
 * @description 判断是否满足 VectorRegion 的类型
 * @param data 原始数据
 */
function isVectorRegion(data: any): data is VectorRegion {
  return data;
}

/**
 * @description 判断是否满足 VectorNetwork 的类型
 * @param data 原始数据
 */
export function isVectorNetwork(data: any): data is VectorNetwork {
  return (
    isVectorVertex(data.vertices) &&
    isVectorSegment(data.segments) &&
    isVectorRegion(data.regions)
  );
}
