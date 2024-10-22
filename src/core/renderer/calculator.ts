import { Curve, Point, Segment } from '@/types';
import { calculateRadianBetweenSegments, calculateVertexDistance } from '@/shared';

/**
 * @description 计算实际倒角的圆角半径，∠AOB
 * @reference https://www.figma.com/plugin-docs/api/properties/nodes-cornerradius/
 * @param o 需要倒圆角的顶点
 * @param a 顶点相邻边的另一端顶点
 * @param b 顶点相邻边的另一端顶点
 */
export function calculateCornerRadius(
  o: Required<VectorVertex>,
  a: Point,
  b: Point
): number {
  const lengthOA = calculateVertexDistance(o, a);
  const lengthOB = calculateVertexDistance(o, b);

  const { cornerRadius } = o;
  const radiusOA = lengthOA < cornerRadius * 2 ? lengthOA / 2 : cornerRadius;
  const radiusOB = lengthOB < cornerRadius * 2 ? lengthOB / 2 : cornerRadius;

  return Math.min(radiusOA, radiusOB);
}

/**
 * @description 计算圆角控制点时用于解方程，求解控制点或切点
 * @param privot 参考顶点
 * @param corner 角的顶点
 * @param value 系数
 */
function calculateControlPoint(privot: Point, corner: Point, value: number): Point {
  // 通过模长的相似性来计算位置，只有数值，没有方向，因此需要一个带正负的系数来修正
  const directionX = privot.x > corner.x ? 1 : -1;
  const directionY = privot.y > corner.y ? 1 : -1;

  return {
    x: corner.x + value * Math.abs(privot.x - corner.x) * directionX,
    y: corner.y + value * Math.abs(privot.y - corner.y) * directionY,
  };
}

/**
 * @description 计算 ARROW_EQUILATERAL 线帽的位置
 * @param startVertex
 * @param endVertex
 * @param strokeWeight
 */
export function calculateArrowCapPosition(
  startVertex: Point,
  endVertex: Point,
  strokeWeight: number,
  strokeCapHeightRatio: number = 5
): Point {
  const length = calculateVertexDistance(startVertex, endVertex);
  const ratio = (strokeCapHeightRatio * strokeWeight) / length;

  const x = startVertex.x + (endVertex.x - startVertex.x) * ratio;
  const y = startVertex.y + (endVertex.y - startVertex.y) * ratio;

  return { x, y };
}

/**
 * @description 求半径点到拐角点的长度
 * @param fromVertex
 * @param cornerVertex
 * @param toVertex
 */
export function calculateRadiusPosition(
  cornerVertex: Required<VectorVertex>,
  fromVertex: VectorVertex,
  toVertex: VectorVertex
): Curve {
  // 计算所围成的 θ 角
  const theta = calculateRadianBetweenSegments(cornerVertex, fromVertex, toVertex);

  // 计算 radius
  const radius = calculateCornerRadius(cornerVertex, fromVertex, toVertex);

  // 计算 BF 的长度
  const bf = radius / Math.tan(theta / 2);
  // TODO(performance) 求角度时已计算过边长，可以考虑优化
  const bc = calculateVertexDistance(fromVertex, cornerVertex);
  const ba = calculateVertexDistance(toVertex, cornerVertex);

  // 计算 h 的长度
  const h = ((4 / 3) * (1 - Math.cos(theta / 2))) / Math.sin(theta / 2);

  // 计算控制点
  const from = calculateControlPoint(fromVertex, cornerVertex, bf / bc);
  const to = calculateControlPoint(toVertex, cornerVertex, bf / ba);
  const controlFrom = calculateControlPoint(from, cornerVertex, (bf - h * radius) / bf);
  const controlTo = calculateControlPoint(to, cornerVertex, (bf - h * radius) / bf);

  return {
    from,
    to,
    controlFrom,
    controlTo,
  };
}

/**
 * @description 计算贝塞尔曲线控制点
 * @param 线段，提供起点终点
 * @param 控制点参数，提供控制点的位置（偏移）
 */
export function calculateBezierPosition(
  { start, end }: Segment,
  { tangentStart, tangentEnd }: Required<VectorSegment>
): Curve {
  return {
    from: start,
    to: end,
    controlFrom: {
      x: start.x + tangentStart.x,
      y: start.y + tangentStart.y,
    },
    controlTo: {
      x: end.x + tangentEnd.x,
      y: end.y + tangentEnd.y,
    },
  };
}
