import { NeighborIndices, SegmentIndex, VertexIndex } from '@/types';

/**
 * @description 获取节点的邻居节点
 * @param segments 线段集
 */
export function getNeighborVertexIndices(
  segments: ReadonlyArray<VectorSegment>
): NeighborIndices<VertexIndex> {
  const neighborIndices: NeighborIndices<VertexIndex> = new Map();

  for (const segment of segments) {
    if (!neighborIndices.has(segment.start)) {
      neighborIndices.set(segment.start, []);
    }
    neighborIndices.get(segment.start)?.push(segment.end);

    if (!neighborIndices.has(segment.end)) {
      neighborIndices.set(segment.end, []);
    }
    neighborIndices.get(segment.end)?.push(segment.start);
  }

  return neighborIndices;
}

/**
 * @description 获取节点的邻居线段
 * @param segments 线段集
 */
export function getNeighborSegmentIndices(segments: ReadonlyArray<VectorSegment>) {
  const neighborIndices: NeighborIndices<SegmentIndex> = new Map();

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    if (!neighborIndices.has(segment.start)) {
      neighborIndices.set(segment.start, []);
    }
    neighborIndices.get(segment.start)?.push(i);

    if (!neighborIndices.has(segment.end)) {
      neighborIndices.set(segment.end, []);
    }
    neighborIndices.get(segment.end)?.push(i);
  }

  return neighborIndices;
}

/**
 * @description 格式化顶点数据
 * @param vertex 顶点
 */
export function formatVertex(vertex: VectorVertex): Required<VectorVertex> {
  return {
    strokeCap: 'NONE',
    strokeJoin: 'MITER',
    cornerRadius: 0,
    handleMirroring: 'NONE',
    ...vertex,
  };
}

/**
 * @description 判断是否需要预留圆角的位置
 * @param vertex 顶点
 */
export function hasCornerRadius(vertex: VectorVertex): boolean {
  return vertex.cornerRadius !== undefined && vertex.cornerRadius > 0;
}

/**
 * @description 判断是否需要预留线帽的位置
 * @param vertex 顶点
 */
export function hasStrokeCap(vertex: VectorVertex): boolean {
  return vertex.strokeCap !== undefined && vertex.strokeCap === 'ARROW_EQUILATERAL';
}

/**
 * @description 判断是否是叶子节点
 * @param indices 邻接表
 * @param index 顶点下标
 */
export function isLeafVertex(
  indices: NeighborIndices<VertexIndex>,
  index: VertexIndex
): boolean {
  return indices.get(index)?.length === 1;
}

/**
 * @description 判断是否是拐角节点，被两条线段相连
 * @param indices 邻接表
 * @param index 顶点下标
 */
export function isCornerVertex(
  indices: NeighborIndices<VertexIndex>,
  index: VertexIndex
): boolean {
  return indices.get(index)?.length === 2;
}

/**
 * @description 判断是否是贝塞尔曲线
 * @param segment 线段
 */
export function isBezierSegment(
  segment: VectorSegment
): segment is Required<VectorSegment> {
  return (
    (segment.tangentStart !== undefined &&
      (segment.tangentStart.x !== 0 || segment.tangentStart.y !== 0)) ||
    (segment.tangentEnd !== undefined &&
      (segment.tangentEnd.x !== 0 || segment.tangentEnd.y !== 0))
  );
}
