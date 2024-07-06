export type Point = {
  x: number;
  y: number;
};

export type Vector = Point;

export type Segment = {
  start: Point;
  end: Point;
};

export type Curve = {
  from: Point;
  to: Point;
  controlFrom: Point;
  controlTo: Point;
};

export type Rect = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};
