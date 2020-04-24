import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CardElement } from './card/card.element';

@NgModule({
  imports: [CommonModule],
  declarations: [CardElement],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WebElementsModule {}
