import { describe, expect, test } from '@jest/globals';
import {
  calculateVertexDistance,
  calculateDegreeBetweenPoints,
  calculateRadianBetweenPoints,
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
    expect(calculateRadianBetweenPoints({ x: 1, y: 2 }, { x: 3, y: 4 })).toBeCloseTo(
      0.98386991
    );
  });

  test('calculateDegreeBetweenPoints', () => {
    expect(calculateDegreeBetweenPoints({ x: 1, y: 2 }, { x: 3, y: 4 })).toBeCloseTo(-45);
  });
});
