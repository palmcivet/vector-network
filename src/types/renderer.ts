import { Point, Segment } from '@/types/geometry';

export type Curve = {
  from: Point;
  to: Point;
  controlFrom: Point;
  controlTo: Point;
};

export type CurveParams = Array<Curve>;

export type SegmentParams = Record<SegmentIndex, Segment>;

export type VertexIndex = number; // 顶点索引

export type SegmentIndex = number; // 线段索引

export type NeighborIndices = Map<VertexIndex, Array<VertexIndex | SegmentIndex>>;
