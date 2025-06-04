import { it, expect, describe } from 'vitest'
import { Easing } from '@tps/easing.types'
import doScale from './do-scale'

describe('doScale', () => {
  it('should handle LINEAR mode (default)', () => {
    const result = doScale([0, 1, 2], 0, 100)
    expect(result).toEqual({
      0: 100,
      1: 50,
      2: 0,
    })
  })

  it('should handle NONE mode', () => {
    const result = doScale([0, 1, 2], 0, 100, 'NONE')
    expect(result).toEqual({
      0: 0,
      1: 1,
      2: 2,
    })
  })

  it('should handle all easing modes', () => {
    const modes = [
      'EASEIN_SINE',
      'EASEOUT_SINE',
      'EASEINOUT_SINE',
      'EASEIN_QUAD',
      'EASEOUT_QUAD',
      'EASEINOUT_QUAD',
      'EASEIN_CUBIC',
      'EASEOUT_CUBIC',
      'EASEINOUT_CUBIC',
    ]

    modes.forEach((mode) => {
      const result = doScale([0, 1], 0, 100, mode as Easing)
      expect(result[0]).toBeDefined()
      expect(result[1]).toBeDefined()
    })
  })

  it('should handle edge cases', () => {
    expect(doScale([0], 0, 100)).toEqual({ 0: 100 })

    const negativeResult = doScale([0, 1], -100, 100)
    expect(negativeResult[0]).toBe(100)
    expect(negativeResult[1]).toBe(-100)

    const smallResult = doScale([0, 1, 2], 0, 0.1)
    expect(Object.values(smallResult).every((v) => v >= 0 && v <= 0.1)).toBe(
      true
    )
  })

  it('should handle specific easing conditions', () => {
    const result = doScale([0, 1, 2], 0, 100, 'EASEINOUT_QUAD')
    expect(result[1]).toBeDefined()

    const manyStops = Array.from({ length: 10 }, (_, i) => i)
    const smallXResult = doScale(manyStops, 0, 100)
    expect(smallXResult[9]).toBe(0)
  })

  it('should set x to zero when x becomes less than 0.01', () => {
    const stops = Array.from({ length: 1000 }, (_, i) => i)
    const result = doScale(stops, 0, 100)
    expect(result[998]).toBe(0)
    expect(result[999]).toBe(0)

    const fewStops = [0, 1, 2]
    const result2 = doScale(fewStops, 0, 100)
    expect(result2[1]).toBe(50)
  })

  it('should handle x value threshold at 0.01 correctly', () => {
    const stopsCount = Math.ceil(1 / 0.01) + 1
    const stops = Array.from({ length: stopsCount }, (_, i) => i)
    const result = doScale(stops, 0, 100)

    const indexAtThreshold = stopsCount - 2
    expect(result[indexAtThreshold - 1]).not.toBe(0)
    expect(result[indexAtThreshold]).toBe(0)
    expect(result[indexAtThreshold + 1]).toBe(0)
  })
})
