import template from './input.html?raw'
import {define} from '../../core'

let INC = 0

@define({
  template,
  name: 'checkbox-input',
})
export class CheckboxInputElement extends HTMLElement {
  static observedAttributes = ['id', 'name', 'checked']

  name = ''
  checked?: string

  get control(): HTMLInputElement {
    return this.shadow.querySelector(
      'input[type="checkbox"]'
    ) as HTMLInputElement
  }

  connectedCallback() {
    this.setAttribute('slot', 'input')
    this.control.tabIndex = -1
    this.tabIndex = 0
    if (!this.id) {
      this.control.id = `${INC++}`
    }
  }

  get shadow(): ShadowRoot {
    return this.shadowRoot as ShadowRoot
  }
}
