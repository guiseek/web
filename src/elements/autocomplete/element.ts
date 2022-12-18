import template from './template.html?raw'
import {define} from '../../core'

@define({name: 'autocomplete-list', template})
export class AutocompleteListElement extends HTMLElement {
  comboboxHasVisualFocus = false
  listboxHasVisualFocus = false

  hasHover = false

  isNone = false
  isList = false
  isBoth = false

  allOptions: HTMLLIElement[] = []

  option?: HTMLLIElement | null
  firstOption?: HTMLLIElement | null
  lastOption?: HTMLLIElement | null

  filteredOptions: HTMLLIElement[] = []
  filter = ''

  connectedCallback() {
    let autocomplete = this.comboboxNode.ariaAutoComplete

    if (typeof autocomplete === 'string') {
      autocomplete = autocomplete.toLowerCase()

      this.isNone = autocomplete === 'none'
      this.isList = autocomplete === 'list'
      this.isBoth = autocomplete === 'both'
    } else {
      // default value of autocomplete
      this.isNone = true
    }

    this.comboboxNode.onkeydown = this.onComboboxKeyDown.bind(this)
    this.comboboxNode.onkeyup = this.onComboboxKeyUp.bind(this)
    this.comboboxNode.onclick = this.onComboboxClick.bind(this)
    this.comboboxNode.onfocus = this.onComboboxFocus.bind(this)
    this.comboboxNode.onblur = this.onComboboxBlur.bind(this)

    document.body.onpointerup = this.onBackgroundPointerUp.bind(this)

    // initialize pop up menu

    this.listboxNode.onpointerover = this.onListboxPointerover.bind(this)
    this.listboxNode.onpointerout = this.onListboxPointerout.bind(this)

    // Traverse the element children of domNode: configure each with
    // option role behavior and store reference in.options array.
    const nodes = this.listboxNode.querySelectorAll('li')

    nodes.forEach((node) => {
      this.allOptions.push(node)
      node.onclick = this.onOptionClick.bind(this)
      node.onpointerover = this.onOptionPointerover.bind(this)
      node.onpointerout = this.onOptionPointerout.bind(this)
    })

    this.filterOptions()

    // Open Button

    const button = this.comboboxNode.nextElementSibling
    if (button instanceof HTMLButtonElement) {
      button.addEventListener('click', this.onButtonClick.bind(this))
    }
  }

  addOption(label: string, value: string) {
    const option = document.createElement('li')
    option.role = 'option'
    option.slot = 'option'
    option.textContent = label
    option.id = value

    option.onclick = this.onOptionClick.bind(this)
    option.onpointerover = this.onOptionPointerover.bind(this)
    option.onpointerout = this.onOptionPointerout.bind(this)

    this.listboxNode.appendChild(option)
    this.allOptions.push(option)
  }

  // ComboboxAutocomplete Events

  filterOptions() {
    // do not filter any options if autocomplete is none
    if (this.isNone) {
      this.filter = ''
    }

    let option = null
    const currentOption = this.option
    const filter = this.filter.toLowerCase()

    this.filteredOptions = []
    this.listboxNode.innerHTML = ''

    this.allOptions.forEach((option) => {
      if (
        filter.length === 0 ||
        this.getLowercaseContent(option).indexOf(filter) === 0
      ) {
        this.filteredOptions.push(option)
        this.listboxNode.appendChild(option)
      }
    })

    // Use populated options array to initialize firstOption and lastOption.
    const numItems = this.filteredOptions.length
    if (numItems > 0) {
      this.firstOption = this.filteredOptions[0]
      this.lastOption = this.filteredOptions[numItems - 1]

      const hasCurrentInFiltered =
        currentOption && this.filteredOptions.indexOf(currentOption) >= 0

      option = hasCurrentInFiltered ? currentOption : this.firstOption
    } else {
      this.firstOption = null
      option = null
      this.lastOption = null
    }

    return option
  }

  getLowercaseContent(node: Node) {
    return node.textContent!.toLowerCase()
  }

  isOptionInView(option: HTMLLIElement) {
    const {top, left, bottom, right} = option.getBoundingClientRect()
    const {clientHeight, clientWidth} = document.documentElement
    return (
      top >= 0 &&
      left >= 0 &&
      bottom <= (innerHeight || clientHeight) &&
      right <= (innerWidth || clientWidth)
    )
  }

  setActiveDescendant(option: HTMLLIElement | boolean) {
    if (typeof option === 'boolean') return

    if (option && this.listboxHasVisualFocus) {
      this.comboboxNode.setAttribute('aria-activedescendant', option.id)
      if (!this.isOptionInView(option)) {
        option.scrollIntoView({behavior: 'smooth', block: 'nearest'})
      }
    } else {
      this.comboboxNode.setAttribute('aria-activedescendant', '')
    }
  }

  setValue(value?: string) {
    this.filter = value ?? ''
    this.comboboxNode.value = this.filter
    this.comboboxNode.setSelectionRange(this.filter.length, this.filter.length)
    this.filterOptions()
  }

  setOption(option: HTMLLIElement, flag = false) {
    if (option) {
      this.option = option
      this.setCurrentOptionStyle(this.option)
      this.setActiveDescendant(this.option)

      if (this.isBoth) {
        this.comboboxNode.value = this.option.textContent ?? ''
        if (flag) {
          this.comboboxNode.setSelectionRange(
            this.option.textContent!.length,
            this.option.textContent!.length
          )
        } else {
          this.comboboxNode.setSelectionRange(
            this.filter.length,
            this.option.textContent!.length
          )
        }
      }
    }
  }

  setVisualFocusCombobox() {
    this.parentNode.classList.add('focus') // set the focus class to the parent for easier styling
    this.comboboxHasVisualFocus = true
    this.listboxHasVisualFocus = false
    this.setActiveDescendant(false)
  }

  setVisualFocusListbox() {
    this.parentNode.classList.remove('focus')
    this.comboboxHasVisualFocus = false
    this.listboxHasVisualFocus = true
    this.listboxNode.classList.add('focus')
    this.setActiveDescendant(this.option!)
  }

  removeVisualFocusAll() {
    this.parentNode.classList.remove('focus')
    this.comboboxHasVisualFocus = false
    this.listboxHasVisualFocus = false
    this.listboxNode.classList.remove('focus')
    this.option = null
    this.setActiveDescendant(false)
  }

  setCurrentOptionStyle(option: HTMLLIElement | boolean | null) {
    this.filteredOptions.forEach((opt) => {
      if (opt === option) {
        // opt.setAttribute('aria-selected', 'true')
        opt.ariaSelected = `true`
        let {scrollTop, offsetHeight} = this.listboxNode

        if (scrollTop + offsetHeight < opt.offsetTop + opt.offsetHeight) {
          scrollTop = opt.offsetTop + opt.offsetHeight - offsetHeight
        } else if (scrollTop > opt.offsetTop + 2) {
          scrollTop = opt.offsetTop
        }
      } else {
        opt.removeAttribute('aria-selected')
      }
    })
  }

  getPreviousOption(currentOption: HTMLLIElement) {
    if (currentOption !== this.firstOption) {
      const index = this.filteredOptions.indexOf(currentOption)
      return this.filteredOptions[index - 1]
    }
    return this.lastOption as HTMLLIElement
  }

  getNextOption(currentOption: HTMLLIElement) {
    if (currentOption !== this.lastOption) {
      const index = this.filteredOptions.indexOf(currentOption)
      return this.filteredOptions[index + 1]
    }
    return this.firstOption as HTMLLIElement
  }

  /* MENU DISPLAY METHODS */

  doesOptionHaveFocus() {
    return this.comboboxNode.getAttribute('aria-activedescendant') !== ''
  }

  get isOpen() {
    return this.listboxNode.style.display === 'block'
  }

  get isClosed() {
    return this.listboxNode.style.display !== 'block'
  }

  get hasOptions() {
    return this.filteredOptions.length
  }

  open() {
    this.listboxNode.style.display = 'block'
    this.comboboxNode.setAttribute('aria-expanded', 'true')
    this.buttonNode.setAttribute('aria-expanded', 'true')
  }

  close(force = false) {
    if (
      force ||
      (!this.comboboxHasVisualFocus &&
        !this.listboxHasVisualFocus &&
        !this.hasHover)
    ) {
      this.setCurrentOptionStyle(false)
      this.listboxNode.style.display = 'none'
      this.comboboxNode.setAttribute('aria-expanded', 'false')
      this.buttonNode.setAttribute('aria-expanded', 'false')
      this.setActiveDescendant(false)
      this.parentNode.classList.add('focus')
    }
  }

  /* combobox Events */

  onComboboxKeyDown(event: KeyboardEvent) {
    let flag = false
    const altKey = event.altKey

    if (event.ctrlKey || event.shiftKey) {
      return
    }

    switch (event.key) {
      case 'Enter': {
        if (this.listboxHasVisualFocus) {
          this.setValue(this.option?.textContent!)
        }
        this.close(true)
        this.setVisualFocusCombobox()
        flag = true
        break
      }
      case 'Down':
      case 'ArrowDown': {
        if (this.filteredOptions.length > 0) {
          if (altKey) {
            this.open()
          } else {
            this.open()
            if (
              this.listboxHasVisualFocus ||
              (this.isBoth && this.filteredOptions.length > 1)
            ) {
              this.setOption(this.getNextOption(this.option!), true)
              this.setVisualFocusListbox()
            } else {
              this.setOption(this.firstOption!, true)
              this.setVisualFocusListbox()
            }
          }
        }
        flag = true
        break
      }
      case 'Up':
      case 'ArrowUp': {
        if (this.hasOptions) {
          if (this.listboxHasVisualFocus) {
            this.setOption(this.getPreviousOption(this.option!), true)
          } else {
            this.open()
            if (!altKey) {
              this.setOption(this.lastOption!, true)
              this.setVisualFocusListbox()
            }
          }
        }
        flag = true
        break
      }
      case 'Esc':
      case 'Escape': {
        if (this.isOpen) {
          this.close(true)
          this.filter = this.comboboxNode.value
          this.filterOptions()
          this.setVisualFocusCombobox()
        } else {
          this.setValue('')
          this.comboboxNode.value = ''
        }
        this.option = null
        flag = true
        break
      }
      case 'Tab': {
        this.close(true)
        if (this.listboxHasVisualFocus) {
          if (this.option) {
            this.setValue(this.option.textContent!)
          }
        }
        break
      }
      case 'Home': {
        this.comboboxNode.setSelectionRange(0, 0)
        flag = true
        break
      }
      case 'End': {
        const length = this.comboboxNode.value.length
        this.comboboxNode.setSelectionRange(length, length)
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

  isPrintableCharacter(str: string) {
    return str.length === 1 && str.match(/\S| /)
  }

  onComboboxKeyUp(event: KeyboardEvent) {
    let flag = false
    let option = null
    const char = event.key

    if (this.isPrintableCharacter(char)) {
      this.filter += char
    }

    // this is for the case when a selection in the textbox has been deleted
    if (this.comboboxNode.value.length < this.filter.length) {
      this.filter = this.comboboxNode.value
      this.option = null
      this.filterOptions()
    }

    if (event.key === 'Escape' || event.key === 'Esc') {
      return
    }

    switch (event.key) {
      case 'Backspace': {
        this.setVisualFocusCombobox()
        this.setCurrentOptionStyle(false)
        this.filter = this.comboboxNode.value
        this.option = null
        this.filterOptions()
        flag = true
        break
      }

      case 'Left':
      case 'ArrowLeft':
      case 'Right':
      case 'ArrowRight':
      case 'Home':
      case 'End': {
        if (this.isBoth) {
          this.filter = this.comboboxNode.value
        } else {
          this.option = null
          this.setCurrentOptionStyle(false)
        }
        this.setVisualFocusCombobox()
        flag = true
        break
      }

      default: {
        if (this.isPrintableCharacter(char)) {
          this.setVisualFocusCombobox()
          this.setCurrentOptionStyle(false)
          flag = true

          if (this.isList || this.isBoth) {
            option = this.filterOptions()
            if (option) {
              if (this.isClosed && this.comboboxNode.value.length) {
                this.open()
              }

              if (
                this.getLowercaseContent(option).indexOf(
                  this.comboboxNode.value.toLowerCase()
                ) === 0
              ) {
                this.option = option
                if (this.isBoth || this.listboxHasVisualFocus) {
                  this.setCurrentOptionStyle(option)
                  if (this.isBoth) {
                    this.setOption(option)
                  }
                }
              } else {
                this.option = null
                this.setCurrentOptionStyle(false)
              }
            } else {
              this.close()
              this.option = null
              this.setActiveDescendant(false)
            }
          } else if (this.comboboxNode.value.length) {
            this.open()
          }
        }

        break
      }
    }

    if (flag) {
      event.stopPropagation()
      event.preventDefault()
    }
  }

  onComboboxClick() {
    if (this.isOpen) this.close(true)
    else this.open()
  }

  onComboboxFocus() {
    this.filter = this.comboboxNode.value
    this.filterOptions()
    this.setVisualFocusCombobox()
    this.option = null
    this.setCurrentOptionStyle(null)
  }

  onComboboxBlur() {
    this.removeVisualFocusAll()
  }

  onBackgroundPointerUp(event: MouseEvent) {
    const target = this.getTarget<HTMLElement>(event)
    if (
      !this.comboboxNode.contains(target) &&
      !this.listboxNode.contains(target) &&
      !this.buttonNode.contains(target)
    ) {
      this.comboboxHasVisualFocus = false
      this.setCurrentOptionStyle(null)
      this.removeVisualFocusAll()
      setTimeout(this.close.bind(this, true), 3000)
    }
  }

  onButtonClick() {
    if (this.isOpen) this.close(true)
    else this.open()

    this.comboboxNode.focus()
    this.setVisualFocusCombobox()
  }

  /* Listbox Events */

  onListboxPointerover() {
    this.hasHover = true
  }

  onListboxPointerout() {
    this.hasHover = false
    setTimeout(this.close.bind(this, false), 3000)
  }

  // Listbox Option Events

  onOptionClick(event: MouseEvent) {
    this.comboboxNode.value = this.getTarget(event, 'textContent') ?? ''
    this.close(true)
  }

  onOptionPointerover() {
    this.hasHover = true
    this.open()
  }

  onOptionPointerout() {
    this.hasHover = false
    setTimeout(this.close.bind(this, false), 300)
  }

  private getTarget<R extends Element = Element, P extends keyof R = any>(
    event: Event,
    prop?: P
  ) {
    const target = event.target as R
    return prop
      ? (target[prop] as R[P])
      : (target as P extends keyof R ? R[P] : R)
  }

  get shadow() {
    return this.shadowRoot as ShadowRoot
  }

  get combobox(): HTMLDivElement {
    return this.shadow.querySelector('.combobox') as HTMLDivElement
  }

  get comboboxNode(): HTMLInputElement {
    return this.combobox.querySelector('input') as HTMLInputElement
  }

  get buttonNode(): HTMLButtonElement {
    return this.combobox.querySelector('button') as HTMLButtonElement
  }

  get listboxNode(): HTMLUListElement {
    return this.combobox.querySelector('ul[role="listbox"]') as HTMLUListElement
  }

  get parentNode(): HTMLElement {
    return this.comboboxNode.parentNode as HTMLElement
  }
}
