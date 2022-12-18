import {CheckboxInputElement} from './input'
import template from './group.html?raw'
import {define} from '../../core'

@define({name: 'checkbox-group', template})
export class CheckboxGroupElement extends HTMLElement {
  static observedAttributes = ['label']

  connectedCallback() {
    this.mixedNode.onkeydown = this.onMixedKeydown.bind(this)
    this.mixedNode.onclick = this.onMixedClick.bind(this)
    this.mixedNode.onfocus = this.onMixedFocus.bind(this)
    this.mixedNode.onblur = this.onMixedBlur.bind(this)

    queueMicrotask(() => {
      this.checkboxNodes.forEach((node) => {
        node.onkeydown = this.onCheckboxKeydown.bind(this)
        node.onclick = this.onCheckboxClick.bind(this)
        node.onfocus = this.onCheckboxFocus.bind(this)
        node.onblur = this.onCheckboxBlur.bind(this)
        const nodeChecked = node.getAttribute('checked') === ''
        const ctrlChecked = node.control.checked
        const checked = nodeChecked ?? ctrlChecked
        node.dataset.lastState = `${checked}`
        node.control.checked = checked

        this.updateMixed()
      })


      const ids = Array.from(this.checkboxNodes).map(({id}) => id)
      this.mixedNode.setAttribute('aria-controls', ids.join(' '))
    })
  }

  attributeChangedCallback(name: string, prev: string, next: string) {
    if (name === 'label' && next !== prev) {
      this.mixedNode!.textContent = next
    }
  }

  updateMixed() {
    const nodes = Array.from(this.checkboxNodes)
    const checked = nodes.filter(({control}) => control.checked)

    if (checked.length === 0) {
      this.mixedNode.ariaChecked = `false`
    } else {
      if (checked.length === this.checkboxNodes.length) {
        this.mixedNode.ariaChecked = `true`
      } else {
        this.mixedNode.ariaChecked = `mixed`
        this.updateCheckboxStates()
      }
    }
  }

  updateCheckboxStates() {
    this.checkboxNodes.forEach((node) => {
      node.dataset.lastState = `${node.control.checked}`
    })
  }

  get anyLastChecked() {
    const nodes = Array.from(this.checkboxNodes)
    return nodes.filter(({dataset}) => dataset.lastState == 'true').length > 0
  }

  setCheckboxes(value: 'last' | 'true' | 'false') {
    this.checkboxNodes.forEach((node) => {
      switch (value) {
        case 'last': {
          node.control.checked = node.dataset.lastState === 'true'
          break
        }

        case 'true': {
          node.control.checked = true
          break
        }

        default: {
          node.control.checked = false
          break
        }
      }
    })

    this.updateMixed()
  }

  toggleMixed() {
    const state = this.mixedNode.ariaChecked

    if (state === 'false') {
      if (this.anyLastChecked) {
        this.setCheckboxes('last')
      } else {
        this.setCheckboxes('true')
      }
    } else {
      if (state === 'mixed') {
        this.setCheckboxes('true')
      } else {
        this.setCheckboxes('false')
      }
    }

    this.updateMixed()
  }

  /* EVENT HANDLERS */

  onMixedKeydown(event: KeyboardEvent) {
    let flag = false

    switch (event.key) {
      case ' ': {
        this.toggleMixed()
        flag = true
        break
      }

      default: {
        break
      }
    }

    if (flag) {
      event.stopPropagation()
      event.preventDefault()
    }
  }

  onMixedClick() {
    this.toggleMixed()
  }

  onMixedFocus() {
    this.mixedNode.classList.add('focus')
  }

  onMixedBlur() {
    this.mixedNode.classList.remove('focus')
  }

  onCheckboxKeydown(event: KeyboardEvent) {
    let flag = false

    switch (event.key) {
      case ' ': {
        const target = this.getCurreentTarget<CheckboxInputElement>(event)
        target.lastState = target.control.checked
        target.control.checked = !target.control.checked
        this.updateMixed()
        flag = true
        break
      }

      default: {
        break
      }
    }

    if (flag) {
      event.stopPropagation()
      event.preventDefault()
    }
  }

  onCheckboxClick(event: MouseEvent) {
    const target = this.getCurreentTarget<HTMLInputElement>(event)
    target.dataset.lastState = target.checked
    this.updateMixed()
  }

  onCheckboxFocus(event: FocusEvent) {
    const parent = this.getCurreentTarget<HTMLInputElement>(event, 'parentNode')
    parent.classList.add('focus')
  }

  onCheckboxBlur(event: FocusEvent) {
    const parent = this.getCurreentTarget<HTMLInputElement>(event, 'parentNode')
    parent.classList.remove('focus')
  }

  private getCurreentTarget<
    R extends Element = Element,
    P extends keyof R = any
  >(event: Event, prop?: P) {
    const target = event.target as R
    return prop
      ? (target[prop] as R[P])
      : (target as P extends keyof R ? R[P] : R)
  }

  get shadow(): ShadowRoot {
    return this.shadowRoot as ShadowRoot
  }
  get mixedNode(): HTMLDivElement {
    return this.shadow.querySelector('[role="checkbox"]') as HTMLDivElement
  }
  get checkboxNodes(): NodeListOf<CheckboxInputElement> {
    return this.querySelectorAll(
      'checkbox-input'
    ) as NodeListOf<CheckboxInputElement>
  }
}
