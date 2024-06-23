import { describe, expect, test } from '@jest/globals';
import { calculateVertexDistance } from '@/shared/math';

describe('math', () => {
  test('calculateCornerRadius', () => {
    expect(
      calculateVertexDistance(
        {
          x: 0,
          y: 0,
        },
        {
          x: 1,
          y: 1,
        }
      )
    ).toBeCloseTo(1.414);
  });
});
