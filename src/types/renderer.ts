import { Curve, Segment } from '@/types/geometry';

/**
 * @description 顶点索引
 */
export type VertexIndex = number;

/**
 * @description 线段索引
 */
export type SegmentIndex = number;

/**
 * @description 顶点索引的邻居索引
 */
export type NeighborIndices<T> = Map<VertexIndex, Array<T>>;

/**
 * @description 用于渲染的参数的中间格式
 */
export type VectorParams = {
  curves: Array<Curve>;
  lines: Array<Segment>;
  isClosed: boolean;
};
