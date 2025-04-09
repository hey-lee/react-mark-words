
![MarkWords](/mark-words.svg)

A React component for mark and highlighting words within text with flexible word boundary matching and customizable styling.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://raw.githubusercontent.com/hey-lee/slice-text/refs/heads/main/LICENSE) [![size](https://img.shields.io/bundlephobia/min/slice-text)](https://bundlephobia.com/package/react-mark-words)


## Features

- 🎯 Precise word boundary matching (whole word, start, end)
- 🎨 Customizable styling and components
- 🛡️ Special characters escaping
- 🔧 Custom match function support

## Installation

```bash
npm i react-mark-words
```

## Usage

```tsx
import { MarkWords } from 'react-mark-words'

function App() {
  return (
    <MarkWords
      text="Hello World! This is a test message."
      words={['Hello', 'test']}
    />
  )
}
```

### Advanced Usage

```tsx
import { MarkWords } from 'react-mark-words'

function App() {
  return (
    <MarkWords
      text="Hello World! This is a test message."
      words={['Hello', 'test']}
      escape={true} // escape RegExp special characters
      caseSensitive={false} // case-sensitive matching
      boundary={true} // whole word matching
      className="mark-words" // container className
      classNames={{
        marked: 'custom-marked',
        unmarked: 'custom-unmarked',
      }}
      containerTag="p"
      unmarkedTag={({ children, className }) => {
        return (
          <span
            className={className} // custom-unmarked
          >{children}</span>
        )
      }} // custom unmarked component
      markedTag={({ children, className }) => {
        return (
          <HoverCard>
            <HoverCardTrigger
              className={className} // custom-marked
            >
              {children}
            </HoverCardTrigger>
            <HoverCardContent>
              Content
            </HoverCardContent>
          </HoverCard>
        )
      }}
    />
  )
}
```

## API

### `MarkWords({ text, words, ... })`

The main component for marking words within text.

#### `text`

Type: `string`
The text content to be processed

#### `words`

Type: `string[]`
Array of words or phrases to be marked

#### `className`

Type: `string?`
Optional className for the container element

#### `classNames`

Type: `{ marked: string, unmarked: string }?`
Optional classNames for marked and unmarked text segments

#### `escape`

Type: `boolean?`
Whether to escape special RegExp characters in search words. Default: `true`

#### `caseSensitive`

Type: `boolean?`
Whether the search should be case-sensitive. Default: `false`

#### `boundary`

Type: `boolean?`
Word boundary matching behavior. Default: `true`

#### `markedTag`

Type: `string | React.ComponentType<any>?`
Custom component or HTML tag for marked text. Default:'mark'

#### `unmarkedTag`

Type: `string | React.ComponentType<any>?`
Custom component or HTML tag for unmarked text. Default: text-only component

#### `containerTag`

Type: `string | React.ComponentType<any>?`
Container element tag or component. Default: 'div'

#### `match`

Type: `(word: string) => RegExp?`
Optional custom matching function

## License

MIT © [Lee](https://github.com/hey-lee)