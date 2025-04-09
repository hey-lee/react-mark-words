
![MarkWords](/mark-words.svg)

A React component for mark and highlighting words within text with flexible word boundary matching and customizable styling.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://raw.githubusercontent.com/hey-lee/slice-text/refs/heads/main/LICENSE)

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
      unmarkedTag={({ children }) => {
        return <span>{children}</span>
      }} // custom unmarked component
      markedTag={({ children }) => {
        return (
          <HoverCard>
            <HoverCardTrigger
              className={markedColor}
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

### `MarkWords`

|Parameter|Type|Required|Default|Description|
|:-:|:-:|:-:|:-:|:-:|
|`text`| `string` | ✅ |  | The text content to be processed |
|`words`| `string[]` | ✅ |  | Array of words or phrases to be marked |
|`className`| `string` |  |  | Optional className for the container element |
|`classNames`| `{ marked: string, unmarked: string }` |  |  | Optional classNames for marked and unmarked text segments |
|`escape`| `boolean` |  | `true` | Whether to escape special RegExp characters in search words. Default: true |
|`caseSensitive`| `boolean` |  | `false` | Whether the search should be case-sensitive. Default: false |
|`boundary`| `boolean` |  | `true` | Word boundary matching behavior. Default: true |
|`markedTag`| `string \| React.ComponentType<any>` |  | `mark` | Custom component or HTML tag for marked text. Default: 'mark' |
|`unmarkedTag`| `string \| React.ComponentType<any>` |  | `({ children }) => children` | Custom component or HTML tag for unmarked text. Default: text-only component |
|`containerTag`| `string \| React.ComponentType<any>` |  | `div` | Container element tag or component. Default: 'div' |
|`match`| `(word: string) => RegExp` |  | `(word) => new RegExp('\\b${word}\\b', 'gi')` | Optional custom matching function |

## License

MIT © [Lee](https://github.com/hey-lee)