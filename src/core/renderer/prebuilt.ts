import { NeighborIndices, VertexIndex } from '@/types';

/**
 * @deprecated 使用 getNeighborVertexIndices 代替
 * @description 获取叶子节点的索引集合
 * @param vertices
 * @param segments
 */
export function getLeafVertexIndices(
  vertices: ReadonlyArray<VectorVertex>,
  segments: ReadonlyArray<VectorSegment>
): Set<VertexIndex> {
  const leafVertexIndices = new Set<number>();
  const vertexIndicesCoutInSegments = new Map<number, number>();

  for (const segment of segments) {
    vertexIndicesCoutInSegments.set(
      segment.start,
      (vertexIndicesCoutInSegments.get(segment.start) || 0) + 1
    );
    vertexIndicesCoutInSegments.set(
      segment.end,
      (vertexIndicesCoutInSegments.get(segment.end) || 0) + 1
    );
  }

  for (let i = 0; i < vertices.length; i++) {
    if (vertexIndicesCoutInSegments.get(i) === 1) {
      leafVertexIndices.add(i);
    }
  }

  return leafVertexIndices;
}

/**
 * @description 获取节点的邻居节点
 * @param segments
 */
export function getNeighborVertexIndices(
  segments: ReadonlyArray<VectorSegment>
): NeighborIndices {
  const neighborIndices: NeighborIndices = new Map();

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
 * @param segments
 */
export function getNeighborSegmentIndices(segments: ReadonlyArray<VectorSegment>) {
  const neighborIndices: NeighborIndices = new Map();

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
 * @param vertex
 * @todo
 */
export function formatVertex(vertex: VectorVertex): Required<VectorVertex> {
  return vertex as Required<VectorVertex>;
}

/**
 * @description 判断是否需要预留圆角的位置
 * @param vertex
 */
export function hasCornerRadius(vertex: VectorVertex): boolean {
  return vertex.cornerRadius !== undefined && vertex.cornerRadius > 0;
}

/**
 * @description 判断是否需要预留线帽的位置
 * @param vertex
 */
export function hasStrokeCap(vertex: VectorVertex): boolean {
  return vertex.strokeCap !== undefined && vertex.strokeCap === 'ARROW_EQUILATERAL';
}

/**
 * @description 判断是否是叶子节点
 * @param indices
 * @param index
 */
export function isLeafVertex(indices: NeighborIndices, index: VertexIndex): boolean {
  return indices.get(index)?.length === 1;
}

/**
 * @description 判断是否是拐角节点，被两条线段相连
 * @param indices
 * @param index
 */
export function isCornerVertex(indices: NeighborIndices, index: VertexIndex): boolean {
  return indices.get(index)?.length === 2;
}

/**
 * @description 判断是否是贝塞尔曲线
 * @param segment
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
