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
