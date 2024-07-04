import { Path } from '@/core/model';
import { Point, SegmentParams, CurveParams, Segment } from '@/types';
import {
  formatVertex,
  hasCornerRadius,
  hasStrokeCap,
  isCornerVertex,
  isLeafVertex,
  getNeighborVertexIndices,
  getNeighborSegmentIndices,
  isBezierSegment,
} from '@/core/renderer/prebuilt';
import {
  calculateRadiusPosition,
  calculateArrowCapPosition,
  calculateBezierPosition,
} from '@/core/renderer/calculator';

/**
 * @description 构建线帽的路径
 */
export function buildStrokeCapPath(
  strokeCap: StrokeCap | ConnectorStrokeCap,
  strokeWeight: number,
  widthRatio: number,
  heightRatio: number
): Path {
  const path = new Path();
  const capWidth = strokeWeight * widthRatio;
  const capHeight = strokeWeight * heightRatio;

  switch (strokeCap) {
    case 'ARROW_LINES': {
      // 线状的箭头，箭头朝右，箭头尖端是 (0, 0)
      const points: Array<Point> = [
        { x: -capHeight, y: capHeight },
        { x: 0, y: 0 },
        { x: capHeight, y: capHeight },
      ];
      path.poly(points, false);
      break;
    }
    case 'ARROW_EQUILATERAL': {
      // 等边三角形，尖端朝右，箭头尖端是 (0, 0)
      const sideLength = (2 * capHeight) / Math.sqrt(3);
      const points: Array<Point> = [
        { x: 0, y: 0 },
        { x: -sideLength / 2, y: capHeight },
        { x: sideLength / 2, y: capHeight },
      ];
      path.poly(points, true);
      break;
    }
    case 'TRIANGLE_FILLED': {
      // 倒三角，尖端朝左，右边是 (0, 0)
      const sideLength = (2 * capHeight) / Math.sqrt(3);
      const points: Array<Point> = [
        { x: -sideLength / 2, y: 0 },
        { x: 0, y: capHeight },
        { x: sideLength / 2, y: 0 },
      ];
      path.poly(points, true);
      break;
    }
    case 'DIAMOND_FILLED': {
      // 绘制菱形，中点在 (0, 0)
      const points: Array<Point> = [
        { x: 0, y: -capWidth },
        { x: -capWidth, y: 0 },
        { x: 0, y: capWidth },
        { x: capWidth, y: 0 },
        { x: 0, y: -capWidth },
      ];
      path.poly(points, true);
      break;
    }
    case 'CIRCLE_FILLED': {
      path.moveTo(0, 0);
      path.circle(0, 0, capWidth);
      break;
    }
    case 'ROUND': {
      path.moveTo(0, 0);
      path.circle(0, 0, strokeWeight / 2);
      break;
    }
    case 'SQUARE': {
      const points: Array<Point> = [
        { x: -strokeWeight / 2, y: -strokeWeight / 2 },
        { x: strokeWeight / 2, y: -strokeWeight / 2 },
        { x: strokeWeight / 2, y: 0 },
        { x: -strokeWeight / 2, y: 0 },
      ];
      path.poly(points, true);
      break;
    }
    case 'NONE':
    default:
      break;
  }

  return path;
}

/**
 * @description build vector path
 * @description 线段 + 圆弧
 * 使用场景：Hover
 */
export function buildVectorStrokePath(
  vertices: ReadonlyArray<VectorVertex>,
  segments: ReadonlyArray<VectorSegment>
): Path {
  const path = new Path();

  segments.forEach((segment) => {
    const startPoint = vertices[segment.start];
    const endPoint = vertices[segment.end];

    path.moveTo(startPoint.x, startPoint.y);
    path.lineTo(endPoint.x, endPoint.y);
  });

  return path;
}

/**
 * @todo 线帽
 * @todo 圆弧倒圆角
 * @description build vector path
 * @description 线段 + 圆弧/圆角 + 线帽
 * 使用场景：渲染
 */
export function buildVectorRenderPath(
  vertices: ReadonlyArray<VectorVertex>,
  segments: ReadonlyArray<VectorSegment>,
  strokeWeight: number
): Path {
  const bezierParams: CurveParams = []; // 使用一个数组存储绘曲线的参数
  const segmentParams: SegmentParams = {}; // 使用一个哈希表存储线段的参数

  const neighborVertexIndices = getNeighborVertexIndices(segments);
  const neighborSegmentIndices = getNeighborSegmentIndices(segments);

  // Segments 不一定具有连续性，所以分段处理更合适
  for (let segmentIndex = 0; segmentIndex < segments.length; segmentIndex++) {
    const segment = segments[segmentIndex];
    const startVertex = formatVertex(vertices.at(segment.start)!);
    const endVertex = formatVertex(vertices.at(segment.end)!);

    // 记录线段的起点和终点
    if (!segmentParams[segmentIndex]) {
      segmentParams[segmentIndex] = { start: startVertex, end: endVertex };
    }

    // 判断叶子节点，判断是否有线帽
    if (isLeafVertex(neighborVertexIndices, segment.start) && hasStrokeCap(startVertex)) {
      // 计算带有线帽线段的起点
      const strokeCapPoint = calculateArrowCapPosition(
        startVertex,
        endVertex,
        strokeWeight
      );
      segmentParams[segmentIndex].start = strokeCapPoint;
    }
    // 判断是否被两条线段相连，判断是否有圆角
    else if (
      isCornerVertex(neighborVertexIndices, segment.start) &&
      hasCornerRadius(startVertex)
    ) {
      // 从邻接表取出当前顶点的邻居顶点下标，必然有两个，一个是当前线段的终点，一个是相邻线段的起点
      const [previousVertexIndex, nextVertexIndex] = neighborVertexIndices.get(
        segment.start
      )!;
      const previousIndex =
        previousVertexIndex === segment.end ? nextVertexIndex : previousVertexIndex;
      const previousVertex = formatVertex(vertices.at(previousIndex)!);

      // 计算曲线的控制点
      const curvePoints = calculateRadiusPosition(startVertex, previousVertex, endVertex);
      bezierParams.push(curvePoints);

      // 从邻接表取出当前顶点的邻居线段下标，必然有两个
      const [previousSegmentIndex, nextSegmentsIndex] = neighborSegmentIndices.get(
        segment.start
      )!;
      const neighborSegmentIndex =
        previousSegmentIndex === segmentIndex ? nextSegmentsIndex : previousSegmentIndex;

      // 记录邻接线段的终点
      if (!segmentParams[neighborSegmentIndex]) {
        segmentParams[neighborSegmentIndex] = {} as Segment;
      }
      segmentParams[neighborSegmentIndex].end = curvePoints.from;

      segmentParams[segmentIndex].start = curvePoints.to;
    }
    // 判断是否是曲线
    else if (isBezierSegment(segment)) {
      const curvePoints = calculateBezierPosition(
        { start: startVertex, end: endVertex },
        segment
      );
      bezierParams.push(curvePoints);

      // 起点终点置为相同，相当于删除该线段
      segmentParams[segmentIndex] = { start: startVertex, end: startVertex };
    }
  }

  const path = new Path();

  for (const { start, end } of Object.values(segmentParams)) {
    path.moveTo(start.x, start.y);
    path.lineTo(end.x, end.y);
  }

  for (const { from, to, controlFrom, controlTo } of bezierParams) {
    path.moveTo(from.x, from.y);
    path.bezierCurveTo(
      controlFrom.x,
      controlFrom.y,
      controlTo.x,
      controlTo.y,
      to.x,
      to.y
    );
  }

  return path;
}
