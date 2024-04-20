/***
 * @description 获取叶子节点的索引集合
 */
export function getLeafVertexIndices(
  vertices: Array<VectorVertex>,
  segments: Array<VectorSegment>
): Set<number> {
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

export function getVertexNeighborIndices(
  segments: Array<VectorSegment>
): Map<number, Array<number>> {
  const vertexNeighborIndices = new Map<number, Array<number>>();

  for (const segment of segments) {
    if (!vertexNeighborIndices.has(segment.start)) {
      vertexNeighborIndices.set(segment.start, []);
    }
    vertexNeighborIndices.get(segment.start)?.push(segment.end);

    if (!vertexNeighborIndices.has(segment.end)) {
      vertexNeighborIndices.set(segment.end, []);
    }
    vertexNeighborIndices.get(segment.end)?.push(segment.start);
  }

  return vertexNeighborIndices;
}

/**
 * @description fromIndices 与 toIndices 合并后，获取合并后 fromIndices 新的索引
 * @param indices 所有索引
 * @param fromIndices 源索引
 * @param toIndics 目标索引
 */
export function calculateActiveIndices(
  indices: Array<number>,
  fromIndices: Array<number>,
  toIndics: Array<number>
): Array<number> {
  const indicesMap = new Map<number, 'KEEP' | 'FROM' | 'TO'>();

  // 构建索引映射
  indices.forEach((index) => indicesMap.set(index, 'KEEP'));

  // 标记 from 索引
  fromIndices.forEach((index) => indicesMap.set(index, 'FROM'));

  // 标记 to 索引
  toIndics.forEach((index) => indicesMap.set(index, 'TO'));

  // 移除 from 索引
  fromIndices.forEach((index) => indicesMap.delete(index));

  // 重建 from 索引
  const newFromIndices: Array<number> = [];
  Array.from(indicesMap.entries()).forEach(([_, status], newIndex) => {
    if (status === 'TO') {
      newFromIndices.push(newIndex);
    }
  });

  return newFromIndices;
}
