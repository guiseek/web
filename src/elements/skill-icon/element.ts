import template from './template.html?raw'
import {parse} from '../../utilities'
import {define} from '../../core'

@define({
  template,
  name: 'skill-icon',
})
export class SkillIconElement extends HTMLElement {
  static observedAttributes = ['icon']

  private emitChange(icon: string) {
    this.dispatchEvent(new CustomEvent('change', {detail: {icon}}))
  }

  private async onIconChange(icon: string) {
    const content = await this.get(icon)
    const fragment = parse(content, 'svg')
    
    if (this.firstElementChild) {
      this.firstElementChild.remove()
    }
    
    this.appendChild(fragment)
    this.emitChange(icon)
  }

  private async get(icon: string) {
    return fetch(`./icons/${icon}.svg`).then((res) => res.text())
  }

  attributeChangedCallback(name: string, prev: string, next: string) {
    if (name === 'icon' && prev !== next) this.onIconChange(next)
  }
}
