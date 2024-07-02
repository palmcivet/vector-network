import { describe, expect, test } from '@jest/globals';
import {
  calculateVertexDistance,
  calculateSegmentRadian,
  calculateRadianBetweenPoints,
  calculateRadianBetweenSegments,
} from '@/shared/math';

describe('math', () => {
  test('calculateCornerRadius', () => {
    expect(calculateVertexDistance({ x: 0, y: 0 }, { x: 1, y: 1 })).toBeCloseTo(
      Math.sqrt(1 ** 2 + 1 ** 2)
    );
    expect(calculateVertexDistance({ x: -4, y: -5 }, { x: 3, y: 1 })).toBeCloseTo(
      Math.sqrt(7 ** 2 + 6 ** 2)
    );
    expect(calculateVertexDistance({ x: -4, y: 5 }, { x: 3, y: 7 })).toBeCloseTo(
      Math.sqrt(7 ** 2 + 2 ** 2)
    );
  });

  test('calculateRadianBetweenPoints', () => {
    expect(calculateRadianBetweenPoints({ x: 1, y: 0 }, { x: 1, y: 1 })).toBeCloseTo(
      Math.PI / 4
    );

    expect(calculateRadianBetweenPoints({ x: 1, y: 0 }, { x: 0, y: 1 })).toBeCloseTo(
      Math.PI / 2
    );

    expect(calculateRadianBetweenPoints({ x: 1, y: 0 }, { x: -1, y: 1 })).toBeCloseTo(
      Math.PI * (3 / 4)
    );

    expect(calculateRadianBetweenPoints({ x: 1, y: 0 }, { x: -1, y: 0 })).toBeCloseTo(
      Math.PI
    );

    expect(calculateRadianBetweenPoints({ x: 1, y: 0 }, { x: -1, y: -1 })).toBeCloseTo(
      Math.PI * (3 / 4)
    );
  });

  test('calculateSegmentRadian', () => {
    expect(
      calculateSegmentRadian({
        start: { x: 0, y: 0 },
        end: { x: 5, y: 0 },
      })
    ).toBeCloseTo(0);

    expect(
      calculateSegmentRadian({
        start: { x: 0, y: 0 },
        end: { x: -5, y: 0 },
      })
    ).toBeCloseTo(Math.PI);

    expect(
      calculateSegmentRadian({
        start: { x: 0, y: 0 },
        end: { x: 1, y: 1 },
      })
    ).toBeCloseTo(Math.PI / 4);

    expect(
      calculateSegmentRadian({
        start: { x: 0, y: 0 },
        end: { x: -1, y: -1 },
      })
    ).toBeCloseTo(-Math.PI * (3 / 4));

    expect(
      calculateSegmentRadian({
        start: { x: 0, y: 0 },
        end: { x: 0, y: -1 },
      })
    ).toBeCloseTo(-Math.PI / 2);
  });

  test('calculateRadianBetweenSegments', () => {
    expect(
      calculateRadianBetweenSegments(
        { x: 30, y: 32 },
        {
          x: 0,
          y: 32,
        },
        { x: 54.5, y: 0 }
      )
    ).toBeCloseTo(1.968885);
  });
});
