import { Point, Segment, Vector } from '@/types';

/**
 * @description 计算顶点距离
 * @param point1
 * @param point2
 */
export function calculateVertexDistance(point1: Point, point2: Point): number {
  const dx = point1.x - point2.x;
  const dy = point1.y - point2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * @deprecated
 * @description 弧度转角度
 * @param radian
 */
export function radianToDegree(radian: number): number {
  return (radian * 180) / Math.PI;
}

/**
 * @deprecated
 * @description 角度转弧度
 * @param degree
 */
export function degreeToRadian(degree: number): number {
  return (degree * Math.PI) / 180;
}

/**
 * @deprecated
 * @description 计算两个向量之间的弧度，以原点为圆心，取较小角
 * @param a 向量 a
 * @param b 向量 b
 */
export function calculateRadianBetweenPoints(a: Vector, b: Vector): number {
  const dotProduct = a.x * b.x + a.y * b.y;
  const aLength = Math.sqrt(a.x * a.x + a.y * a.y);
  const bLength = Math.sqrt(b.x * b.x + b.y * b.y);
  return Math.acos(dotProduct / (aLength * bLength));
}

/**
 * @deprecated
 * @description 坐标系：X 轴向右，Y 轴向下，计算有向线段的角度
 * 以 X 轴正方向为始边，在 X 轴下方为正数，在 X 轴上方为负数
 * @param segment 有向线段，即射线
 */
export function calculateSegmentRadian({ start, end }: Segment): number {
  const UNIT_VECTOR: Vector = { x: 1, y: 0 };
  const vector: Vector = { x: end.x - start.x, y: end.y - start.y };
  let radian = calculateRadianBetweenPoints(UNIT_VECTOR, vector);

  if (vector.y < 0) {
    radian = -radian;
  }

  return radian;
}

/**
 * @description 使用余弦定理计算三个顶点所围成的较小角的弧度
 * @param cornerVertex
 * @param fromVertex
 * @param toVertex
 */
export function calculateRadianBetweenSegments(
  cornerVertex: Point,
  fromVertex: Point,
  toVertex: Point
): number {
  // 计算三边长度
  const a = calculateVertexDistance(cornerVertex, fromVertex);
  const b = calculateVertexDistance(fromVertex, toVertex);
  const c = calculateVertexDistance(cornerVertex, toVertex);

  // 余弦定理，求出 cos B
  const cosB = (Math.pow(a, 2) + Math.pow(c, 2) - Math.pow(b, 2)) / (2 * a * b);

  return Math.acos(cosB);
}
