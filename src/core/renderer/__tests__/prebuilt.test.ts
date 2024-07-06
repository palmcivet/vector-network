import { describe, expect, test } from '@jest/globals';
import { NeighborIndices, VertexIndex } from '@/types';
import {
  hasCornerRadius,
  hasStrokeCap,
  isCornerVertex,
  isLeafVertex,
} from '@/core/renderer/prebuilt';

describe('prebuilt', () => {
  test('hasCornerRadius', () => {
    expect(
      hasCornerRadius({
        x: 0,
        y: 1,
        cornerRadius: 2,
      })
    ).toBe(true);

    expect(
      hasCornerRadius({
        x: 0,
        y: 1,
      })
    ).toBe(false);

    expect(
      hasCornerRadius({
        x: 0,
        y: 1,
        cornerRadius: -1,
      })
    ).toBe(false);

    expect(
      hasCornerRadius({
        x: 0,
        y: 1,
        cornerRadius: 0,
      })
    ).toBe(false);
  });

  test('hasStrokeCap', () => {
    expect(
      hasStrokeCap({
        x: 0,
        y: 1,
        strokeCap: 'ARROW_EQUILATERAL',
      })
    ).toBe(true);

    expect(
      hasStrokeCap({
        x: 0,
        y: 1,
        strokeCap: 'ROUND',
      })
    ).toBe(false);

    expect(
      hasStrokeCap({
        x: 0,
        y: 1,
      })
    ).toBe(false);
  });

  test('isLeafVertex', () => {
    const map = new Map() as NeighborIndices<VertexIndex>;
    map.set(0, [1, 2]);
    map.set(1, [0]);
    map.set(2, [0]);
    expect(isLeafVertex(map, 1)).toBe(true);
    expect(isLeafVertex(map, 0)).toBe(false);
    expect(isLeafVertex(map, 3)).toBe(false);
  });

  test('isCornerVertex', () => {
    const map = new Map() as NeighborIndices<VertexIndex>;
    map.set(0, [1, 2]);
    map.set(1, [0]);
    map.set(2, [0]);
    expect(isCornerVertex(map, 0)).toBe(true);
    expect(isCornerVertex(map, 1)).toBe(false);
  });
});
