export function clone<R extends Element>(
  template: HTMLTemplateElement,
  deep = true
) {
  return template.content.cloneNode(deep) as R extends Element ? Node : R
}
