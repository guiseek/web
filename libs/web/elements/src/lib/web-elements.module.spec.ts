import { async, TestBed } from '@angular/core/testing';
import { WebElementsModule } from './web-elements.module';

describe('WebElementsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [WebElementsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(WebElementsModule).toBeDefined();
  });
});
