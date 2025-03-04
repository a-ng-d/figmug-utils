import { it, expect } from 'vitest'
import doClassnames from './do-classnames'
it('should join multiple classes', () => {
  expect(doClassnames(['foo', 'bar'])).toBe('foo bar')
})

it('should filter out falsy values', () => {
  expect(doClassnames(['foo', '', 'bar', null, undefined])).toBe('foo bar')
})

it('should return empty string for empty array', () => {
  expect(doClassnames([])).toBe('')
})

it('should handle single class name', () => {
  expect(doClassnames(['test'])).toBe('test')
})

it('should preserve whitespace in class names', () => {
  expect(doClassnames(['foo bar', 'baz'])).toBe('foo bar baz')
})
