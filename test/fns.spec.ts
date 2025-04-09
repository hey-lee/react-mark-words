import { describe, it, expect } from 'vitest'
import { escapeRegExp, getPattern } from '../src/fns'

describe('escapeRegExp', () => {
  it('should escape special regex characters', () => {
    const specialChars = [
      { input: '[', expected: '\\[' },
      { input: ']', expected: '\\]' },
      { input: '(', expected: '\\(' },
      { input: ')', expected: '\\)' },
      { input: '{', expected: '\\{' },
      { input: '}', expected: '\\}' },
      { input: '*', expected: '\\*' },
      { input: '+', expected: '\\+' },
      { input: '?', expected: '\\?' },
      { input: '.', expected: '\\.' },
      { input: '^', expected: '\\^' },
      { input: '$', expected: '\\$' },
      { input: '|', expected: '\\|' },
      { input: '\\', expected: '\\\\' },
      { input: '/', expected: '\\/' },
      { input: '-', expected: '\\-' },
    ]

    specialChars.forEach(({ input, expected }) => {
      expect(escapeRegExp(input)).toBe(expected)
    })
  })

  it('should handle multiple special characters', () => {
    expect(escapeRegExp('(hello)*')).toBe('\\(hello\\)\\*')
    expect(escapeRegExp('[test]+')).toBe('\\[test\\]\\+')
    expect(escapeRegExp('$.^')).toBe('\\$\\.\\^')
  })

  it('should not modify normal characters', () => {
    expect(escapeRegExp('hello')).toBe('hello')
    expect(escapeRegExp('world123')).toBe('world123')
    expect(escapeRegExp('abc')).toBe('abc')
  })

  it('should handle empty string', () => {
    expect(escapeRegExp('')).toBe('')
  })

  it('should handle mixed special and normal characters', () => {
    expect(escapeRegExp('hello(world)')).toBe('hello\\(world\\)')
    expect(escapeRegExp('test.com')).toBe('test\\.com')
    expect(escapeRegExp('$price*2')).toBe('\\$price\\*2')
  })

  it('should handle repeated special characters', () => {
    expect(escapeRegExp('...')).toBe('\\.\\.\\.')
    expect(escapeRegExp('***')).toBe('\\*\\*\\*')
    expect(escapeRegExp('$$$')).toBe('\\$\\$\\$')
  })
})

describe('getPattern word boundaries', () => {
  it('should match empty string', () => {
    const text = ' word '
    const pattern = getPattern(' ', true)
    const regex = new RegExp(pattern, 'g')
    const matches = text.match(regex)
    
    expect(matches).toEqual([' ', ' '])
  })

  it('should match word start when set to "start"', () => {
    const text = 'test testing tested contest'
    const pattern = getPattern('test', 'start')
    const regex = new RegExp(pattern, 'g')
    const matches = text.match(regex)
    expect(matches).toEqual(['testing', 'tested'])
  })

  it('should match word end when set to "end"', () => {
    const text = 'test contest retest'
    const pattern = getPattern('test', 'end')
    const regex = new RegExp(pattern, 'g')
    const matches = text.match(regex)
    expect(matches).toEqual(['contest', 'retest'])
  })

  it('should match exact word when boundary is true', () => {
    const text = 'test testing tested contest retest'
    const pattern = getPattern('test', true)
    const regex = new RegExp(pattern, 'g')
    const matches = text.match(regex)
    expect(matches).toEqual(['test'])
  })

  it('should match anywhere when boundary is false', () => {
    const text = 'test testing tested contest retest'
    const pattern = getPattern('test', false)
    const regex = new RegExp(pattern, 'g')
    const matches = text.match(regex)
    expect(matches).toEqual(['test', 'test', 'test', 'test', 'test'])
  })

  it('should handle numbers in words', () => {
    const text = 'test123 test123ing test123ed'
    const pattern = getPattern('test123', 'start')
    const regex = new RegExp(pattern, 'g')
    const matches = text.match(regex)
    
    expect(matches).toEqual(['test123ing', 'test123ed'])
  })

  it('should handle multiple word matches', () => {
    const text = 'pretest test posttest testing tested'
    const pattern = getPattern('test', 'end')
    const regex = new RegExp(pattern, 'g')
    const matches = text.match(regex)
    expect(matches).toEqual(['pretest', 'posttest'])
  })

  it('should handle word boundaries with punctuation', () => {
    const text = 'test, testing. tested! (test)'
    const pattern = getPattern('test', 'end')
    const regex = new RegExp(pattern, 'g')
    const matches = text.match(regex)

    expect(matches).toEqual(null)
  })
})
