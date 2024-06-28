import { describe, expect, test } from '@jest/globals';
import { calculateCornerRadius } from '@/core/renderer/calculator';

describe('calculator', () => {
  test('calculateCornerRadius', () => {
    const corner: Required<VectorVertex> = {
      x: 0,
      y: 0,
      cornerRadius: 6,
      strokeCap: 'ROUND',
      strokeJoin: 'ROUND',
      handleMirroring: 'NONE',
    };

    expect(
      calculateCornerRadius(
        corner,
        {
          x: 5,
          y: 0,
        },
        {
          x: 0,
          y: 10,
        }
      )
    ).toBe(2.5);

    expect(
      calculateCornerRadius(
        corner,
        {
          x: 14,
          y: 0,
        },
        {
          x: 0,
          y: 16,
        }
      )
    ).toBe(6);

    expect(
      calculateCornerRadius(
        corner,
        {
          x: 14,
          y: 0,
        },
        {
          x: 0,
          y: 10,
        }
      )
    ).toBe(5);
  });
});
