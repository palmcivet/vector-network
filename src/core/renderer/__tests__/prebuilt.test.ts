import { describe, expect, test } from '@jest/globals';
import { hasCornerRadius, hasStrokeCap } from '@/core/renderer/prebuilt';

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
});
