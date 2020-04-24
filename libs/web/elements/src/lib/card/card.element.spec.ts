import { ComponentFixture } from '@angular/core/testing';
import { CardElement } from './card.element';
describe('CardElement', () => {
  let component: CardElement;
  let fixture: ComponentFixture<CardElement>;
  beforeEach(() => {
    // TestBed.configureTestingModule({
    //   schemas: [NO_ERRORS_SCHEMA],
    //   declarations: [CardElement]
    // });
    // fixture = TestBed.createComponent(CardElement);
    // component = fixture.componentInstance;
    component = new CardElement();
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('count defaults to: 1', () => {
    expect(component.count).toEqual(1);
  });
  it('interval defaults to: undefined', () => {
    expect(component.interval).toEqual(undefined);
  });
  it('eventHandled defaults to: false', () => {
    expect(component.eventHandled).toEqual(false);
  });

});
