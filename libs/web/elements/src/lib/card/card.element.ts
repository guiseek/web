import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'web-card',
  templateUrl: './card.element.html',
  styleUrls: ['./card.element.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class CardElement implements OnInit {
  @ViewChild('webCard') customEl: ElementRef;
  count = 1;
  interval;
  eventHandled = false;


  constructor() { }

  ngOnInit(): void {
    this.handleTestEvent = this.handleTestEvent.bind(this);
    this.customEl.nativeElement
      .addEventListener('camelEvent', this.handleTestEvent);
  }

  handleTestEvent() {
    this.eventHandled = true;
  }
}
