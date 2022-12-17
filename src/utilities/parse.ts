import html from './html'

export function parse<K extends keyof HTMLElementTagNameMap>(
  value: string,
  target: K
): HTMLElementTagNameMap[K]
export function parse<K extends keyof SVGElementTagNameMap>(
  value: string,
  target: K
): SVGElementTagNameMap[K]
export function parse<K extends string>(value: string, target: K) {
  const isHTML = html.some(({name}) => name === target)
  const type = isHTML ? 'text/html' : 'image/svg+xml'
  
  const parser = new DOMParser()
  const parsed = parser.parseFromString(value, type)
  
  return parsed.querySelector(target)
}
