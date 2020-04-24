export class WebCardComponent extends HTMLElement {
  public static observedAttributes = ['title','subtitle'];

  set title(value) {
    this.setAttribute('title', value);
  }
  get title() {
    return this.getAttribute('title');
  }

  set subtitle(value) {
    this.setAttribute('subtitle', value);
  }
  get subtitle() {
    return this.getAttribute('subtitle');
  }

  constructor() {
    super();
    this.addEventListener('click', this.onClick);
    this.attachShadow({ mode: 'open' });
  }
  attributeChangedCallback() {
    console.log(this.title, this.subtitle);

    this.shadowRoot.innerHTML = `
      <header>
        <h1>${this.title}</h1>
        <p>${this.subtitle}</p>
      </header>
      <slot></slot>
    `;
  }
  onClick() {
    console.log('click');

    this.dispatchEvent(new CustomEvent('cardClicked', {
      detail: 'Web Card'
    }));
  }
}

customElements.define('web-card', WebCardComponent);