import {clone, parse} from '../../utilities'

interface Options {
  name: string
  template: string
  mode?: ShadowRootMode
}
export function define(options: Options) {
  const {name, template, mode = 'open'} = options

  return <T extends CustomElementConstructor>(target: T) => {
    const connected = target.prototype.connectedCallback ?? (() => null)

    target.prototype.connectedCallback = function () {
      const shadow = this.attachShadow({mode})
      const parsed = parse(template, 'template')

      shadow.appendChild(clone(parsed))

      connected.call(this)
    }

    customElements.define(name, target)
  }
}
