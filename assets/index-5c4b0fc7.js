var k=Object.defineProperty;var C=(n,e,t)=>e in n?k(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var r=(n,e,t)=>(C(n,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function t(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerpolicy&&(s.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?s.credentials="include":o.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(o){if(o.ep)return;o.ep=!0;const s=t(o);fetch(o.href,s)}})();function v(n,e=!0){return n.content.cloneNode(e)}const E=[{name:"div",interface:typeof HTMLDivElement},{name:"a",interface:typeof HTMLAnchorElement},{name:"em",interface:typeof HTMLElement},{name:"strong",interface:typeof HTMLElement},{name:"small",interface:typeof HTMLElement},{name:"s",interface:typeof HTMLElement},{name:"cite",interface:typeof HTMLElement},{name:"q",interface:typeof HTMLQuoteElement},{name:"dfn",interface:typeof HTMLElement},{name:"abbr",interface:typeof HTMLElement},{name:"ruby",interface:typeof HTMLElement},{name:"rt",interface:typeof HTMLElement},{name:"rp",interface:typeof HTMLElement},{name:"data",interface:typeof HTMLDataElement},{name:"time",interface:typeof HTMLTimeElement},{name:"code",interface:typeof HTMLElement},{name:"var",interface:typeof HTMLElement},{name:"samp",interface:typeof HTMLElement},{name:"kbd",interface:typeof HTMLElement},{name:"sub",interface:typeof HTMLElement},{name:"sup",interface:typeof HTMLElement},{name:"i",interface:typeof HTMLElement},{name:"b",interface:typeof HTMLElement},{name:"u",interface:typeof HTMLElement},{name:"mark",interface:typeof HTMLElement},{name:"bdi",interface:typeof HTMLElement},{name:"bdo",interface:typeof HTMLElement},{name:"span",interface:typeof HTMLSpanElement},{name:"br",interface:typeof HTMLBRElement},{name:"wbr",interface:typeof HTMLElement},{name:"ins",interface:typeof HTMLModElement},{name:"del",interface:typeof HTMLModElement},{name:"picture",interface:typeof HTMLPictureElement},{name:"source",interface:typeof HTMLSourceElement},{name:"img",interface:typeof HTMLImageElement},{name:"iframe",interface:typeof HTMLIFrameElement},{name:"embed",interface:typeof HTMLEmbedElement},{name:"object",interface:typeof HTMLObjectElement},{name:"video",interface:typeof HTMLVideoElement},{name:"audio",interface:typeof HTMLAudioElement},{name:"track",interface:typeof HTMLTrackElement},{name:"map",interface:typeof HTMLMapElement},{name:"area",interface:typeof HTMLAreaElement},{name:"table",interface:typeof HTMLTableElement},{name:"caption",interface:typeof HTMLTableCaptionElement},{name:"colgroup",interface:typeof HTMLTableColElement},{name:"col",interface:typeof HTMLTableColElement},{name:"tbody",interface:typeof HTMLTableSectionElement},{name:"thead",interface:typeof HTMLTableSectionElement},{name:"tfoot",interface:typeof HTMLTableSectionElement},{name:"tr",interface:typeof HTMLTableRowElement},{name:"td",interface:typeof HTMLTableCellElement},{name:"th",interface:typeof HTMLTableCellElement},{name:"form",interface:typeof HTMLFormElement},{name:"label",interface:typeof HTMLLabelElement},{name:"input",interface:typeof HTMLInputElement},{name:"button",interface:typeof HTMLButtonElement},{name:"select",interface:typeof HTMLSelectElement},{name:"datalist",interface:typeof HTMLDataListElement},{name:"optgroup",interface:typeof HTMLOptGroupElement},{name:"option",interface:typeof HTMLOptionElement},{name:"textarea",interface:typeof HTMLTextAreaElement},{name:"output",interface:typeof HTMLOutputElement},{name:"progress",interface:typeof HTMLProgressElement},{name:"meter",interface:typeof HTMLMeterElement},{name:"fieldset",interface:typeof HTMLFieldSetElement},{name:"legend",interface:typeof HTMLLegendElement},{name:"details",interface:typeof HTMLDetailsElement},{name:"summary",interface:typeof HTMLElement},{name:"dialog",interface:typeof HTMLDialogElement},{name:"script",interface:typeof HTMLScriptElement},{name:"noscript",interface:typeof HTMLElement},{name:"template",interface:typeof HTMLTemplateElement},{name:"slot",interface:typeof HTMLSlotElement},{name:"canvas",interface:typeof HTMLCanvasElement}];function y(n,e){const i=E.some(({name:l})=>l===e)?"text/html":"image/svg+xml";return new DOMParser().parseFromString(n,i).querySelector(e)}function u(n,e){return(e??document).querySelector(n)}const L=`<template>
  <style>
    :host {
      display: block;
    }
    .combobox-list {
      position: relative;
      z-index: 2;
    }

    .combobox .group {
      display: inline-flex;
      padding: 4px;
      cursor: pointer;
    }

    .combobox input,
    .combobox button {
      background-color: white;
      color: black;
      box-sizing: border-box;
      height: 24px;
      padding: 0;
      margin: 0;
      vertical-align: bottom;
      border: 1px solid gray;
      position: relative;
      cursor: pointer;
    }

    .combobox input {
      width: 150px;
      border-right: none;
      outline: none;
      font-size: 87.5%;
      padding: 1px 3px;
    }

    .combobox button {
      width: 19px;
      border-left: none;
      outline: none;
      color: rgb(0 90 156);
    }

    .combobox button[aria-expanded='true'] svg {
      transform: rotate(180deg) translate(0, -3px);
    }

    ul[role='listbox'] {
      margin: 0;
      padding: 0;
      position: absolute;
      left: 4px;
      top: 28px;
      list-style: none;
      color: black;
      background-color: white;
      display: none;
      box-sizing: border-box;
      border: 2px currentcolor solid;
      max-height: 250px;
      width: 168px;
      overflow: scroll;
      overflow-x: hidden;
      font-size: 87.5%;
      cursor: pointer;
    }

    ul[role='listbox'] li[role='option'] {
      margin: 0;
      display: block;
      padding-left: 3px;
      padding-top: 2px;
      padding-bottom: 2px;
    }

    /* focus and hover styling */

    .combobox .group.focus,
    .combobox .group:hover {
      padding: 2px;
      border: 2px solid #ec13dd;
      border-radius: 4px;
    }

    .combobox .group.focus polygon,
    .combobox .group:hover polygon {
      fill-opacity: 1;
    }

    .combobox .group.focus input,
    .combobox .group.focus button,
    .combobox .group input:hover,
    .combobox .group button:hover {
      background-color: #def;
    }

    [role='listbox'].focus [role='option'][aria-selected='true'],
    [role='listbox'] [role='option']:hover {
      background-color: rgba(255, 255, 255, 0.1);
      padding-top: 0;
      padding-bottom: 0;
      border-top: 2px solid currentcolor;
      border-bottom: 2px solid currentcolor;
    }
  </style>
  <div class="combobox combobox-list">
    <div class="group">
      <input
        id="cb1-input"
        class="cb_edit"
        type="text"
        role="combobox"
        autocomplete="off"
        aria-autocomplete="list"
        aria-expanded="false"
        aria-controls="cb1-listbox"
      />
      <button
        id="cb1-button"
        tabindex="-1"
        aria-label="States"
        aria-expanded="false"
        aria-controls="cb1-listbox"
      >
        <svg
          width="18"
          height="16"
          aria-hidden="true"
          focusable="false"
          style="forced-color-adjust: auto"
        >
          <polygon
            class="arrow"
            stroke-width="0"
            fill-opacity="0.75"
            fill="currentcolor"
            points="3,6 15,6 9,14"
          ></polygon>
        </svg>
      </button>
    </div>
    <ul id="cb1-listbox" role="listbox" aria-label="States">
      <slot name="option"></slot>
    </ul>
  </div>
</template>
`;function a(n){const{name:e,template:t,mode:i="open"}=n;return o=>{const s=o.prototype.connectedCallback??(()=>null);o.prototype.connectedCallback=function(){const l=this.attachShadow({mode:i}),c=y(t,"template");l.appendChild(v(c)),s.call(this)},customElements.define(e,o)}}var T=Object.defineProperty,w=Object.getOwnPropertyDescriptor,H=(n,e,t,i)=>{for(var o=i>1?void 0:i?w(e,t):e,s=n.length-1,l;s>=0;s--)(l=n[s])&&(o=(i?l(e,t,o):l(o))||o);return i&&o&&T(e,t,o),o};let f=class extends HTMLElement{constructor(){super(...arguments);r(this,"comboboxHasVisualFocus",!1);r(this,"listboxHasVisualFocus",!1);r(this,"hasHover",!1);r(this,"isNone",!1);r(this,"isList",!1);r(this,"isBoth",!1);r(this,"allOptions",[]);r(this,"option");r(this,"firstOption");r(this,"lastOption");r(this,"filteredOptions",[]);r(this,"filter","")}connectedCallback(){let e=this.comboboxNode.ariaAutoComplete;typeof e=="string"?(e=e.toLowerCase(),this.isNone=e==="none",this.isList=e==="list",this.isBoth=e==="both"):this.isNone=!0,this.comboboxNode.onkeydown=this.onComboboxKeyDown.bind(this),this.comboboxNode.onkeyup=this.onComboboxKeyUp.bind(this),this.comboboxNode.onclick=this.onComboboxClick.bind(this),this.comboboxNode.onfocus=this.onComboboxFocus.bind(this),this.comboboxNode.onblur=this.onComboboxBlur.bind(this),document.body.onpointerup=this.onBackgroundPointerUp.bind(this),this.listboxNode.onpointerover=this.onListboxPointerover.bind(this),this.listboxNode.onpointerout=this.onListboxPointerout.bind(this),this.listboxNode.querySelectorAll("li").forEach(o=>{this.allOptions.push(o),o.onclick=this.onOptionClick.bind(this),o.onpointerover=this.onOptionPointerover.bind(this),o.onpointerout=this.onOptionPointerout.bind(this)}),this.filterOptions();const i=this.comboboxNode.nextElementSibling;i instanceof HTMLButtonElement&&i.addEventListener("click",this.onButtonClick.bind(this))}addOption(e,t){const i=document.createElement("li");i.role="option",i.slot="option",i.textContent=e,i.id=t,i.onclick=this.onOptionClick.bind(this),i.onpointerover=this.onOptionPointerover.bind(this),i.onpointerout=this.onOptionPointerout.bind(this),this.listboxNode.appendChild(i),this.allOptions.push(i)}filterOptions(){this.isNone&&(this.filter="");let e=null;const t=this.option,i=this.filter.toLowerCase();this.filteredOptions=[],this.listboxNode.innerHTML="",this.allOptions.forEach(s=>{(i.length===0||this.getLowercaseContent(s).indexOf(i)===0)&&(this.filteredOptions.push(s),this.listboxNode.appendChild(s))});const o=this.filteredOptions.length;return o>0?(this.firstOption=this.filteredOptions[0],this.lastOption=this.filteredOptions[o-1],e=t&&this.filteredOptions.indexOf(t)>=0?t:this.firstOption):(this.firstOption=null,e=null,this.lastOption=null),e}getLowercaseContent(e){return e.textContent.toLowerCase()}isOptionInView(e){const{top:t,left:i,bottom:o,right:s}=e.getBoundingClientRect(),{clientHeight:l,clientWidth:c}=document.documentElement;return t>=0&&i>=0&&o<=(innerHeight||l)&&s<=(innerWidth||c)}setActiveDescendant(e){typeof e!="boolean"&&(e&&this.listboxHasVisualFocus?(this.comboboxNode.setAttribute("aria-activedescendant",e.id),this.isOptionInView(e)||e.scrollIntoView({behavior:"smooth",block:"nearest"})):this.comboboxNode.setAttribute("aria-activedescendant",""))}setValue(e){this.filter=e??"",this.comboboxNode.value=this.filter,this.comboboxNode.setSelectionRange(this.filter.length,this.filter.length),this.filterOptions()}setOption(e,t=!1){e&&(this.option=e,this.setCurrentOptionStyle(this.option),this.setActiveDescendant(this.option),this.isBoth&&(this.comboboxNode.value=this.option.textContent??"",t?this.comboboxNode.setSelectionRange(this.option.textContent.length,this.option.textContent.length):this.comboboxNode.setSelectionRange(this.filter.length,this.option.textContent.length)))}setVisualFocusCombobox(){this.parentNode.classList.add("focus"),this.comboboxHasVisualFocus=!0,this.listboxHasVisualFocus=!1,this.setActiveDescendant(!1)}setVisualFocusListbox(){this.parentNode.classList.remove("focus"),this.comboboxHasVisualFocus=!1,this.listboxHasVisualFocus=!0,this.listboxNode.classList.add("focus"),this.setActiveDescendant(this.option)}removeVisualFocusAll(){this.parentNode.classList.remove("focus"),this.comboboxHasVisualFocus=!1,this.listboxHasVisualFocus=!1,this.listboxNode.classList.remove("focus"),this.option=null,this.setActiveDescendant(!1)}setCurrentOptionStyle(e){this.filteredOptions.forEach(t=>{if(t===e){t.ariaSelected="true";let{scrollTop:i,offsetHeight:o}=this.listboxNode;i+o<t.offsetTop+t.offsetHeight?i=t.offsetTop+t.offsetHeight-o:i>t.offsetTop+2&&(i=t.offsetTop)}else t.removeAttribute("aria-selected")})}getPreviousOption(e){if(e!==this.firstOption){const t=this.filteredOptions.indexOf(e);return this.filteredOptions[t-1]}return this.lastOption}getNextOption(e){if(e!==this.lastOption){const t=this.filteredOptions.indexOf(e);return this.filteredOptions[t+1]}return this.firstOption}doesOptionHaveFocus(){return this.comboboxNode.getAttribute("aria-activedescendant")!==""}get isOpen(){return this.listboxNode.style.display==="block"}get isClosed(){return this.listboxNode.style.display!=="block"}get hasOptions(){return this.filteredOptions.length}open(){this.listboxNode.style.display="block",this.comboboxNode.setAttribute("aria-expanded","true"),this.buttonNode.setAttribute("aria-expanded","true")}close(e=!1){(e||!this.comboboxHasVisualFocus&&!this.listboxHasVisualFocus&&!this.hasHover)&&(this.setCurrentOptionStyle(!1),this.listboxNode.style.display="none",this.comboboxNode.setAttribute("aria-expanded","false"),this.buttonNode.setAttribute("aria-expanded","false"),this.setActiveDescendant(!1),this.parentNode.classList.add("focus"))}onComboboxKeyDown(e){var o;let t=!1;const i=e.altKey;if(!(e.ctrlKey||e.shiftKey)){switch(e.key){case"Enter":{this.listboxHasVisualFocus&&this.setValue((o=this.option)==null?void 0:o.textContent),this.close(!0),this.setVisualFocusCombobox(),t=!0;break}case"Down":case"ArrowDown":{this.filteredOptions.length>0&&(i?this.open():(this.open(),this.listboxHasVisualFocus||this.isBoth&&this.filteredOptions.length>1?(this.setOption(this.getNextOption(this.option),!0),this.setVisualFocusListbox()):(this.setOption(this.firstOption,!0),this.setVisualFocusListbox()))),t=!0;break}case"Up":case"ArrowUp":{this.hasOptions&&(this.listboxHasVisualFocus?this.setOption(this.getPreviousOption(this.option),!0):(this.open(),i||(this.setOption(this.lastOption,!0),this.setVisualFocusListbox()))),t=!0;break}case"Esc":case"Escape":{this.isOpen?(this.close(!0),this.filter=this.comboboxNode.value,this.filterOptions(),this.setVisualFocusCombobox()):(this.setValue(""),this.comboboxNode.value=""),this.option=null,t=!0;break}case"Tab":{this.close(!0),this.listboxHasVisualFocus&&this.option&&this.setValue(this.option.textContent);break}case"Home":{this.comboboxNode.setSelectionRange(0,0),t=!0;break}case"End":{const s=this.comboboxNode.value.length;this.comboboxNode.setSelectionRange(s,s),t=!0;break}}t&&(e.stopPropagation(),e.preventDefault())}}isPrintableCharacter(e){return e.length===1&&e.match(/\S| /)}onComboboxKeyUp(e){let t=!1,i=null;const o=e.key;if(this.isPrintableCharacter(o)&&(this.filter+=o),this.comboboxNode.value.length<this.filter.length&&(this.filter=this.comboboxNode.value,this.option=null,this.filterOptions()),!(e.key==="Escape"||e.key==="Esc")){switch(e.key){case"Backspace":{this.setVisualFocusCombobox(),this.setCurrentOptionStyle(!1),this.filter=this.comboboxNode.value,this.option=null,this.filterOptions(),t=!0;break}case"Left":case"ArrowLeft":case"Right":case"ArrowRight":case"Home":case"End":{this.isBoth?this.filter=this.comboboxNode.value:(this.option=null,this.setCurrentOptionStyle(!1)),this.setVisualFocusCombobox(),t=!0;break}default:{this.isPrintableCharacter(o)&&(this.setVisualFocusCombobox(),this.setCurrentOptionStyle(!1),t=!0,this.isList||this.isBoth?(i=this.filterOptions(),i?(this.isClosed&&this.comboboxNode.value.length&&this.open(),this.getLowercaseContent(i).indexOf(this.comboboxNode.value.toLowerCase())===0?(this.option=i,(this.isBoth||this.listboxHasVisualFocus)&&(this.setCurrentOptionStyle(i),this.isBoth&&this.setOption(i))):(this.option=null,this.setCurrentOptionStyle(!1))):(this.close(),this.option=null,this.setActiveDescendant(!1))):this.comboboxNode.value.length&&this.open());break}}t&&(e.stopPropagation(),e.preventDefault())}}onComboboxClick(){this.isOpen?this.close(!0):this.open()}onComboboxFocus(){this.filter=this.comboboxNode.value,this.filterOptions(),this.setVisualFocusCombobox(),this.option=null,this.setCurrentOptionStyle(null)}onComboboxBlur(){this.removeVisualFocusAll()}onBackgroundPointerUp(e){const t=this.getTarget(e);!this.comboboxNode.contains(t)&&!this.listboxNode.contains(t)&&!this.buttonNode.contains(t)&&(this.comboboxHasVisualFocus=!1,this.setCurrentOptionStyle(null),this.removeVisualFocusAll(),setTimeout(this.close.bind(this,!0),3e3))}onButtonClick(){this.isOpen?this.close(!0):this.open(),this.comboboxNode.focus(),this.setVisualFocusCombobox()}onListboxPointerover(){this.hasHover=!0}onListboxPointerout(){this.hasHover=!1,setTimeout(this.close.bind(this,!1),3e3)}onOptionClick(e){this.comboboxNode.value=this.getTarget(e,"textContent")??"",this.close(!0)}onOptionPointerover(){this.hasHover=!0,this.open()}onOptionPointerout(){this.hasHover=!1,setTimeout(this.close.bind(this,!1),300)}getTarget(e,t){const i=e.target;return t?i[t]:i}get shadow(){return this.shadowRoot}get combobox(){return this.shadow.querySelector(".combobox")}get comboboxNode(){return this.combobox.querySelector("input")}get buttonNode(){return this.combobox.querySelector("button")}get listboxNode(){return this.combobox.querySelector('ul[role="listbox"]')}get parentNode(){return this.comboboxNode.parentNode}};f=H([a({name:"autocomplete-list",template:L})],f);const O=`<template>
  <style>
    :host {
      display: inline-flex;
      justify-items: center;
      flex-direction: column;
    }

    :host ul.checkboxes {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    :host ul.checkboxes li {
      margin: 0;
      padding: 0;
      padding-left: 15px;
    }

    :host label {
      margin: 1px;
      padding: 4px;
    }

    :host [role='checkbox'] {
      /* display: inline-block; */
      /* padding: 4px; */
      z-index: 1;
      padding: 0 4px 0 6px;
      border: 2px solid transparent;
      cursor: pointer;
    }

    :host [role='checkbox']::before {
      position: relative;
      top: 1px;
      content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='16' width='16' style='forced-color-adjust: auto;'%3E%3Crect x='2' y='2' height='13' width='13' rx='2' stroke='black' stroke-width='1' fill-opacity='0' /%3E%3C/svg%3E");
    }

    :host [role='checkbox'][aria-checked='true']::before {
      position: relative;
      top: 1px;
      content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='16' width='16' style='forced-color-adjust: auto;'%3E%3Crect x='2' y='2' height='13' width='13' rx='2' stroke='black' stroke-width='1' fill-opacity='0' /%3E%3Cpolyline points='4,8 7,12 12,5' fill='none' stroke='black' stroke-width='2' /%3E%3C/svg%3E");
    }

    :host [role='checkbox'][aria-checked='mixed']::before {
      position: relative;
      top: 1px;
      content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='16' width='16' style='forced-color-adjust: auto;'%3E%3Crect x='2' y='2' height='13' width='13' rx='2' stroke='black' stroke-width='1' fill-opacity='0' /%3E%3Cline x1='5' y1='5' x2='12' y2='12' stroke='black' stroke-width='2' /%3E%3C/svg%3E");
    }

    :host input:focus,
    :host [role='checkbox'] {
      outline: none;
    }

    :host [role='checkbox']:focus,
    :host [role='checkbox']:hover {
      /* padding: 2px; */
      border: 2px solid #ec13dd;
      border-radius: 5px;
      /* background-color: #def; */
    }

    @media (prefers-color-scheme: dark) {
      :host [role='checkbox']::before {
        content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='16' width='16' style='forced-color-adjust: auto;'%3E%3Crect x='2' y='2' height='13' width='13' rx='2' stroke='white' stroke-width='1' fill-opacity='0' /%3E%3C/svg%3E");
      }

      :host [role='checkbox'][aria-checked='true']::before {
        content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='16' width='16' style='forced-color-adjust: auto;'%3E%3Crect x='2' y='2' height='13' width='13' rx='2' stroke='white' stroke-width='1' fill-opacity='0' /%3E%3Cpolyline points='4,8 7,12 12,5' fill='none' stroke='white' stroke-width='2' /%3E%3C/svg%3E");
      }

      :host [role='checkbox'][aria-checked='mixed']::before {
        content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='16' width='16' style='forced-color-adjust: auto;'%3E%3Crect x='2' y='2' height='13' width='13' rx='2' stroke='white' stroke-width='1' fill-opacity='0' /%3E%3Cline x1='5' y1='5' x2='12' y2='12' stroke='white' stroke-width='2' /%3E%3C/svg%3E");
      }
    }
  </style>
  <div
    role="checkbox"
    class="group_checkbox"
    aria-checked="mixed"
    aria-controls="cond1 cond2 cond3 cond4"
    tabindex="0"
  >
    <slot name="label"></slot>
  </div>
  <div class="checkboxes">
    <slot name="input"></slot>
  </div>
</template>
`;var M=Object.defineProperty,N=Object.getOwnPropertyDescriptor,S=(n,e,t,i)=>{for(var o=i>1?void 0:i?N(e,t):e,s=n.length-1,l;s>=0;s--)(l=n[s])&&(o=(i?l(e,t,o):l(o))||o);return i&&o&&M(e,t,o),o},h;let b=(h=class extends HTMLElement{connectedCallback(){this.mixedNode.onkeydown=this.onMixedKeydown.bind(this),this.mixedNode.onclick=this.onMixedClick.bind(this),this.mixedNode.onfocus=this.onMixedFocus.bind(this),this.mixedNode.onblur=this.onMixedBlur.bind(this),queueMicrotask(()=>{this.checkboxNodes.forEach(e=>{e.onkeydown=this.onCheckboxKeydown.bind(this),e.onclick=this.onCheckboxClick.bind(this),e.onfocus=this.onCheckboxFocus.bind(this),e.onblur=this.onCheckboxBlur.bind(this);const t=e.getAttribute("checked")==="",i=e.control.checked,o=t??i;e.dataset.lastState=`${o}`,e.control.checked=o,this.updateMixed()});const n=Array.from(this.checkboxNodes).map(({id:e})=>e);this.mixedNode.setAttribute("aria-controls",n.join(" "))})}attributeChangedCallback(n,e,t){n==="label"&&t!==e&&(this.mixedNode.textContent=t)}updateMixed(){const e=Array.from(this.checkboxNodes).filter(({control:t})=>t.checked);e.length===0?this.mixedNode.ariaChecked="false":e.length===this.checkboxNodes.length?this.mixedNode.ariaChecked="true":(this.mixedNode.ariaChecked="mixed",this.updateCheckboxStates())}updateCheckboxStates(){this.checkboxNodes.forEach(n=>{n.dataset.lastState=`${n.control.checked}`})}get anyLastChecked(){return Array.from(this.checkboxNodes).filter(({dataset:e})=>e.lastState=="true").length>0}setCheckboxes(n){this.checkboxNodes.forEach(e=>{switch(n){case"last":{e.control.checked=e.dataset.lastState==="true";break}case"true":{e.control.checked=!0;break}default:{e.control.checked=!1;break}}}),this.updateMixed()}toggleMixed(){const n=this.mixedNode.ariaChecked;n==="false"?this.anyLastChecked?this.setCheckboxes("last"):this.setCheckboxes("true"):n==="mixed"?this.setCheckboxes("true"):this.setCheckboxes("false"),this.updateMixed()}onMixedKeydown(n){let e=!1;switch(n.key){case" ":{this.toggleMixed(),e=!0;break}}e&&(n.stopPropagation(),n.preventDefault())}onMixedClick(){this.toggleMixed()}onMixedFocus(){this.mixedNode.classList.add("focus")}onMixedBlur(){this.mixedNode.classList.remove("focus")}onCheckboxKeydown(n){let e=!1;switch(n.key){case" ":{const t=this.getCurreentTarget(n);t.lastState=t.control.checked,t.control.checked=!t.control.checked,this.updateMixed(),e=!0;break}}e&&(n.stopPropagation(),n.preventDefault())}onCheckboxClick(n){const e=this.getCurreentTarget(n);e.dataset.lastState=e.checked,this.updateMixed()}onCheckboxFocus(n){this.getCurreentTarget(n,"parentNode").classList.add("focus")}onCheckboxBlur(n){this.getCurreentTarget(n,"parentNode").classList.remove("focus")}getCurreentTarget(n,e){const t=n.target;return e?t[e]:t}get shadow(){return this.shadowRoot}get mixedNode(){return this.shadow.querySelector('[role="checkbox"]')}get checkboxNodes(){return this.querySelectorAll("checkbox-input")}},r(h,"observedAttributes",["label"]),h);b=S([a({name:"checkbox-group",template:O})],b);const F=`<template>
  <style>
    :host {
      display: block;
      padding: 4px 2px 0 0;
      accent-color: #000;
    }
    
    @media (prefers-color-scheme: dark) {
      :host {
        accent-color: #fff;
      }
    }
    
    :host input:focus {
      outline: none;
    }
    
    :host label {
      padding: 2px 8px 2px 4px;
      display: inline-flex;
      align-items: center;
      column-gap: 6px;
      border: 2px solid transparent;
      border-radius: 5px;
    }
    :host label.focus,
    :host label:hover {
      border: 2px solid #ec13dd;
      cursor: pointer;
    }
  </style>

  <label>
    <input type="checkbox" />
    <slot></slot>
  </label>
</template>
`;var P=Object.defineProperty,A=Object.getOwnPropertyDescriptor,V=(n,e,t,i)=>{for(var o=i>1?void 0:i?A(e,t):e,s=n.length-1,l;s>=0;s--)(l=n[s])&&(o=(i?l(e,t,o):l(o))||o);return i&&o&&P(e,t,o),o};let _=0;var d;let m=(d=class extends HTMLElement{constructor(){super(...arguments);r(this,"name","");r(this,"checked")}get control(){return this.shadow.querySelector('input[type="checkbox"]')}connectedCallback(){this.setAttribute("slot","input"),this.control.tabIndex=-1,this.tabIndex=0,this.id||(this.control.id=`${_++}`)}get shadow(){return this.shadowRoot}},r(d,"observedAttributes",["id","name","checked"]),d);m=V([a({template:F,name:"checkbox-input"})],m);const D=`<template>
  <style>
    :host {
      display: inline-flex;
      padding: 4px 2px 1px 4px;
    }
  </style>

  <slot></slot>
</template>
`;var B=Object.defineProperty,j=Object.getOwnPropertyDescriptor,$=(n,e,t,i)=>{for(var o=i>1?void 0:i?j(e,t):e,s=n.length-1,l;s>=0;s--)(l=n[s])&&(o=(i?l(e,t,o):l(o))||o);return i&&o&&B(e,t,o),o};let x=class extends HTMLElement{connectedCallback(){this.setAttribute("slot","label")}};x=$([a({template:D,name:"checkbox-label"})],x);const I=`<template>
  <style>
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background-color: #ede5f0;
    }
    @media (prefers-color-scheme: dark) {
      :host {
        background-color: #251C31;
      }
    }
  </style>
  <slot></slot>
</template>`;var q=Object.defineProperty,K=Object.getOwnPropertyDescriptor,R=(n,e,t,i)=>{for(var o=i>1?void 0:i?K(e,t):e,s=n.length-1,l;s>=0;s--)(l=n[s])&&(o=(i?l(e,t,o):l(o))||o);return i&&o&&q(e,t,o),o},p;let g=(p=class extends HTMLElement{emitChange(n){this.dispatchEvent(new CustomEvent("change",{detail:{icon:n}}))}async onIconChange(n){const e=await this.get(n),t=y(e,"svg");this.firstElementChild&&this.firstElementChild.remove(),this.appendChild(t),this.emitChange(n)}async get(n){return fetch(`./icons/${n}.svg`).then(e=>e.text())}attributeChangedCallback(n,e,t){n==="icon"&&e!==t&&this.onIconChange(t)}},r(p,"observedAttributes",["icon"]),p);g=R([a({template:I,name:"skill-icon"})],g);onload=()=>{const n=u("skill-icon#framework");n==null||n.addEventListener("change",({detail:i,type:o})=>{console.log(i),console.log(o)});const e=async(i="nome")=>{const o="https://servicodados.ibge.gov.br/api/v1",s=`/localidades/estados?orderBy=${i}`;return fetch(o+s).then(l=>l.json())},t=u("autocomplete-list");t&&e().then(i=>i.forEach(({nome:o,sigla:s})=>t.addOption(o,s))),setTimeout(()=>{n==null||n.setAttribute("icon","react"),setTimeout(()=>{n==null||n.setAttribute("icon","angular")},3e3)},2e3)};
