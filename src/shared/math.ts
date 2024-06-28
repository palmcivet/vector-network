import { Point, Vector } from '@/types';

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
 * @description 弧度转角度
 * @param radian
 */
export function radianToDegree(radian: number): number {
  return (radian * 180) / Math.PI;
}

/**
 * @description 角度转弧度
 * @param degree
 */
export function degreeToRadian(degree: number): number {
  return (degree * Math.PI) / 180;
}

/**
 * @description 计算两个坐标点之间的弧度
 * @param a 坐标点 a
 * @param b 坐标点 b
 */
export function calculateRadianBetweenPoints(a: Point, b: Point): number {
  const dotProduct = a.x * b.x + a.y * b.y;
  const aLength = Math.sqrt(a.x * a.x + a.y * a.y);
  const bLength = Math.sqrt(b.x * b.x + b.y * b.y);
  return dotProduct / (aLength * bLength);
}

/**
 * @description 通过线段的起止两点计算角度，以 Y 轴负方向为始边
 * @param a 终点
 * @param b 起点
 */
export function calculateDegreeBetweenPoints(a: Point, b: Point) {
  const vector: Vector = { x: a.x - b.x, y: a.y - b.y };

  // 坐标系：X 轴向右，Y 轴向下
  // 基准角度，垂直 X 轴向上，即 (0, -1) 向量
  const unit_vector = { x: 0, y: -1 };
  const radian = calculateRadianBetweenPoints(vector, unit_vector);
  let degree = radianToDegree(Math.acos(radian));

  // 顺时针 [0, 180]，逆时针 [0, -180)
  // 当 vector.x 小于 0 时，此时向量在第二或者第三象限，角度为负数
  if (vector.x < 0) {
    degree = -degree;
  }

  return degree;
}
