import {
  AutocompleteListElement,
  CheckboxGroupElement,
  CheckboxInputElement,
  SkillIconElement,
} from '../elements'

declare global {
  interface HTMLElementTagNameMap {
    'skill-icon': SkillIconElement
    'autocomplete-list': AutocompleteListElement
    'checkbox-group': CheckboxGroupElement
    'checkbox-input': CheckboxInputElement
  }
  interface HTMLElementEventMap {
    change: CustomEvent<{icon: string}>
  }
}
