
import { createElement } from 'react'
import { sliceText } from 'slice-text'

/**
 * Props interface for the MarkWords component
 * @interface MarkWordsProps
 */

export interface MarkWordsProps {
  /** The text content to be processed */
  text: string
  /** Array of words or phrases to be marked */
  words: string[]
  /** Optional className for the container element */
  className?: string
  /** Optional classNames for marked and unmarked text segments */
  classNames?: {
    /** Class name for marked text segments */
    marked?: string
    /** Class name for unmarked text segments */
    unmarked?: string
  }
  /** Whether to escape special RegExp characters in search words. Default: true */
  escape?: boolean
  /** Whether the search should be case-sensitive. Default: false */
  caseSensitive?: boolean
  /** Word boundary matching behavior. Default: true */
  boundary?: boolean | 'start' | 'end'
  /** Custom component or HTML tag for marked text. Default: 'mark' */
  markedTag?: keyof HTMLElementTagNameMap | React.ComponentType<any> | undefined
  /** Custom component or HTML tag for unmarked text. Default: text-only component */
  unmarkedTag?: keyof HTMLElementTagNameMap | React.ComponentType<any> | undefined
  /** Container element tag or component. Default: 'div' */
  containerTag?: keyof HTMLElementTagNameMap | React.ComponentType<any> | undefined
  /** Custom matching function */
  match?: (word: string) => RegExp
}

export const UnmarkedTag = ({ children }: { children: React.ReactNode }) => children

/**
 * MarkWords component mark specified words within a text content
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <MarkWords
 *   text="Hello world!"
 *   words={["world"]}
 * />
 * 
 * // Custom styling
 * <MarkWords
 *   text="Hello world!"
 *   words={["world"]}
 *   classNames={{
 *     marked: "marked-text",
 *     unmarked: "normal-text"
 *   }}
 * />
 * 
 * // Custom matching behavior
 * <MarkWords
 *   text="Hello WORLD!"
 *   words={["world"]}
 *   caseSensitive={true}
 *   match={word => new RegExp(`\\b${word}\\b`, "i")}
 * />
 * 
 * // Custom components
 * <MarkWords
 *   text="Hello world!"
 *   words={["world"]}
 *   markedTag={CustomHighlight}
 *   containerTag="span"
 * />
 * ```
 */
export const MarkWords = ({
  text,
  words,
  classNames,
  escape = true,
  boundary = true,
  caseSensitive = false,
  markedTag = `mark`,
  unmarkedTag = UnmarkedTag,
  containerTag = `div`,
  match,
  ...props
}: MarkWordsProps) => {
  const optionsOrMatch = typeof match === `function` ? match : {
    escape,
    boundary,
    caseSensitive,
  }
  const slices = sliceText(text, words, optionsOrMatch)

  return createElement(containerTag, {
    ...props,
    children: slices.map(({ start, end, matched }, index) => {
      const textSlice = text.slice(start, end)

      if (matched) {
        return createElement(markedTag, {
          key: index,
          children: textSlice,
          className: classNames?.marked ?? `marked`,
        })
      } else {
        return createElement(unmarkedTag, {
          key: index,
          children: textSlice,
          className: classNames?.unmarked,
        })
      }
    }),
  })
}

export default MarkWords