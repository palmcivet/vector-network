import { describe, expect, test } from '@jest/globals';
import { calculateActiveIndices } from '@/core/interaction/calculator';

describe('calculator', () => {
  test('calculateActiveIndices', () => {
    expect(calculateActiveIndices([0, 1, 2, 3, 4, 5, 6], [1, 3], [4, 6])).toEqual([2, 4]);
    expect(calculateActiveIndices([0, 1, 2, 3], [3], [0])).toEqual([0]);
    expect(calculateActiveIndices([0, 1, 2, 3], [0], [3])).toEqual([2]);
  });
});
