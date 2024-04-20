import { Path, Point } from '@/core/model';

function buildStrokeCapPath(
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
 * @description 线段 + 圆弧
 * @todo
 */
function buildSingleCompositePath(): Path {
  const path = new Path();
  return path;
}

/**
 * @description 线段 + 圆弧/圆角 + 端点槽位
 */
function buildSingleRenderPath(): Path {
  const path = new Path();

  // cornerRadius
  // https://www.figma.com/plugin-docs/api/properties/nodes-cornerradius
  return path;
}

/**
 * @description build vector path
 * @description 线段 + 圆弧
 * @todo
 */
export function buildVectorStrokePath(
  vertices: ReadonlyArray<VectorVertex>,
  segments: ReadonlyArray<VectorSegment>
): Path {
  const path = new Path();
  return path;
}

/**
 * @description build vector path
 * @description 线段 + 圆弧/圆角 + 端点
 */
export function buildVectorRenderPath(
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
