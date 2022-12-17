import template from './input.html?raw'
import {define} from '../../core'

@define({
  template,
  name: 'checkbox-input',
})
export class CheckboxInputElement extends HTMLElement {
  static observedAttributes = ['checked']

  get shadow(): ShadowRoot {
    return this.shadowRoot as ShadowRoot
  }
  get control(): HTMLInputElement {
    return this.shadow.querySelector(
      'input[type="checkbox"]'
    ) as HTMLInputElement
  }

  connectedCallback() {
    this.setAttribute('slot', 'input')
  }
}
