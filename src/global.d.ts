/**
 * @figma/plugin-typings/plugin-api.d.ts
 */

type StrokeCap = 'NONE' | 'ROUND' | 'SQUARE' | 'ARROW_LINES' | 'ARROW_EQUILATERAL';
type StrokeJoin = 'MITER' | 'BEVEL' | 'ROUND';
type HandleMirroring = 'NONE' | 'ANGLE' | 'ANGLE_AND_LENGTH';
type WindingRule = 'NONZERO' | 'EVENODD';

interface Vector {
  readonly x: number;
  readonly y: number;
}

interface RGB {
  readonly r: number;
  readonly g: number;
  readonly b: number;
}

type Paint = {
  readonly type: 'SOLID';
  readonly color: RGB;
};

interface VectorVertex {
  readonly x: number;
  readonly y: number;
  readonly strokeCap?: StrokeCap;
  readonly strokeJoin?: StrokeJoin;
  readonly cornerRadius?: number;
  readonly handleMirroring?: HandleMirroring;
}
interface VectorSegment {
  readonly start: number;
  readonly end: number;
  readonly tangentStart?: Vector;
  readonly tangentEnd?: Vector;
}
interface VectorRegion {
  readonly windingRule: WindingRule;
  readonly loops: ReadonlyArray<ReadonlyArray<number>>;
  readonly fills?: ReadonlyArray<Paint>;
  readonly fillStyleId?: string;
}

interface VectorNetwork {
  readonly vertices: ReadonlyArray<VectorVertex>;
  readonly segments: ReadonlyArray<VectorSegment>;
  readonly regions?: ReadonlyArray<VectorRegion>;
}
