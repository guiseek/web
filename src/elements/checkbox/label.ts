import template from './label.html?raw'
import {define} from '../../core'

@define({
  template,
  name: 'checkbox-label',
})
export class CheckboxLabelElement extends HTMLElement {
  connectedCallback() {
    this.setAttribute('slot', 'label')
  }
}
