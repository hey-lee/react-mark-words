import { describe, it, expect } from 'vitest'
import { MarkWords, UnmarkedTag } from '../src/index'

// words
describe('words parameter', () => {
  it('should handle empty words array', () => {
    const result = MarkWords({
      words: [],
      text: 'Hello World',
    })
    expect(result.props.children).toHaveLength(1)
    expect(result.props.children[0].props.children).toBe('Hello World')
  })

  it('should handle multiple words', () => {
    const result = MarkWords({
      words: ['Hello', 'World'],
      text: 'Hello World',
    })
    expect(result.props.children).toHaveLength(3)
    expect(result.props.children[0].type).toBe('mark')
    expect(result.props.children[2].type).toBe('mark')
  })

  it('should handle overlapping words', () => {
    const result = MarkWords({
      words: ['World', 'Worldwide'],
      text: 'Hello Worldwide',
    })
    expect(result.props.children[1].props.children).toBe('Worldwide')
  })
})

// text
describe('text parameter', () => {
  it('should handle empty text', () => {
    const result = MarkWords({
      words: ['test'],
      text: '',
    })
    expect(result.props.children).toHaveLength(0)
  })

  it('should handle text with special characters', () => {
    const result = MarkWords({
      words: ['test'],
      text: 'test! test? test.',
    })

    expect(result.props.children).toHaveLength(6)
  })
})

// caseSensitive
describe('caseSensitive parameter', () => {
  it('should be case insensitive by default', () => {
    const result = MarkWords({
      words: ['test'],
      text: 'Test TEST test',
    })
    expect(
      result.props.children.filter((child) => child.type === 'mark')
    ).toHaveLength(3)
  })

  it('should be case sensitive when true', () => {
    const result = MarkWords({
      words: ['test'],
      text: 'Test TEST test',
      caseSensitive: true,
    })
    expect(
      result.props.children.filter((child) => child.type === 'mark')
    ).toHaveLength(1)
  })
})

// boundary
describe('boundary parameter', () => {
  it('should match whole words by default', () => {
    const result = MarkWords({
      words: ['test'],
      text: 'test testing tested',
    })
    expect(
      result.props.children.filter((child) => child.type === 'mark')
    ).toHaveLength(1)
  })

  it('should match word start when set to "start"', () => {
    const result = MarkWords({
      words: ['test'],
      text: 'test testing tested',
      boundary: 'start',
    })
    const matched = result.props.children.filter(
      (child) => child.type === 'mark'
    )

    expect(matched).toHaveLength(2)
    expect(matched.map(({ props }) => props.children)).toEqual([
      'testing',
      'tested',
    ])
  })

  it('should match word end when set to "end"', () => {
    const result = MarkWords({
      words: ['test'],
      text: 'test contest tested',
      boundary: 'end',
    })

    const matched = result.props.children.filter(
      (child) => child.type === 'mark'
    )
    
    expect(matched).toHaveLength(1)
    expect(matched.map(({ props }) => props.children)).toEqual([
      'contest',
    ])
  })
})

// className
describe('className parameter', () => {
  it('should apply container className', () => {
    const result = MarkWords({
      words: ['test'],
      text: 'test',
      className: 'container',
    })
    expect(result.props.className).toBe('container')
  })
})

// classNames
describe('classNames parameter', () => {
  it('should apply matched className', () => {
    const result = MarkWords({
      words: ['test'],
      text: 'test',
      classNames: { marked: 'highlight' },
    })
    expect(result.props.children[0].props.className).toBe('highlight')
  })

  it('should apply unmatched className', () => {
    const result = MarkWords({
      words: ['test'],
      text: 'hello test',
      classNames: { unmarked: 'normal' },
    })
    expect(result.props.children[0].props.className).toBe('normal')
  })
})

// markedTag
describe('markedTag parameter', () => {
  it('should use default mark tag', () => {
    const result = MarkWords({
      words: ['test'],
      text: 'test',
    })
    expect(result.props.children[0].type).toBe('mark')
  })

  it('should use custom tag string', () => {
    const result = MarkWords({
      words: ['test'],
      text: 'test',
      markedTag: 'strong',
    })
    expect(result.props.children[0].type).toBe('strong')
  })

  it('should use custom component', () => {
    const CustomComponent = () => null
    const result = MarkWords({
      words: ['test'],
      text: 'test',
      markedTag: CustomComponent,
    })

    expect(result.props.children[0].type).toBe(CustomComponent)
  })
})

// unmarkedTag
describe('unmarkedTag parameter', () => {
  it('should use default text only component', () => {
    const result = MarkWords({
      words: ['test'],
      text: 'hello test',
    })
    
    expect(result.props.children[0].type).toBe(UnmarkedTag)
  })

  it('should use custom tag', () => {
    const result = MarkWords({
      words: ['test'],
      text: 'hello test',
      unmarkedTag: 'p',
    })
    expect(result.props.children[0].type).toBe('p')
  })
})

// containerTag
describe('containerTag parameter', () => {
  it('should use default div tag', () => {
    const result = MarkWords({
      words: ['test'],
      text: 'test',
    })
    expect(result.type).toBe('div')
  })

  it('should use custom container tag', () => {
    const result = MarkWords({
      words: ['test'],
      text: 'test',
      containerTag: 'section',
    })
    expect(result.type).toBe('section')
  })
})

// match
describe('MarkWords match parameter', () => {
  it('should use default match function correctly', () => {
    const result = MarkWords({
      text: 'Hello World',
      words: ['World'],
    })

    expect(result.props.children).toHaveLength(2)
    expect(result.props.children[1].props.children).toBe('World')
    expect(result.props.children[1].type).toBe('mark')
  })

  it('should accept custom match function', () => {
    const customMatch = (word: string) => new RegExp(word, 'g')
    const result = MarkWords({
      text: 'Hello World',
      words: ['World'],
      match: customMatch,
    })

    expect(result.props.children).toHaveLength(2)
    expect(result.props.children[1].props.children).toBe('World')
    expect(result.props.children[1].type).toBe('mark')
  })

  it('should override default escape and boundary with custom match', () => {
    const customMatch = (word: string) => new RegExp(`test${word}`, 'g')
    const result = MarkWords({
      text: 'testWorld helloWorld',
      words: ['World'],
      escape: true,
      boundary: true,
      match: customMatch,
    })

    expect(result.props.children[0].props.children).toBe('testWorld')
    expect(result.props.children[0].type).toBe('mark')
  })

  it('should handle multiple matches with custom function', () => {
    const customMatch = (word: string) => new RegExp(`${word}\\w+`, 'g')
    const result = MarkWords({
      text: 'testing tester tested',
      words: ['test'],
      match: customMatch,
    })

    const markedElements = result.props.children.filter(
      (child) => child.type === 'mark'
    )
    expect(markedElements).toHaveLength(3)
    expect(markedElements[0].props.children).toBe('testing')
    expect(markedElements[1].props.children).toBe('tester')
    expect(markedElements[2].props.children).toBe('tested')
  })
})
