import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralResultPageComponent } from './general-result-page.component';

describe('GeneralResultPageComponent', () => {
  let component: GeneralResultPageComponent;
  let fixture: ComponentFixture<GeneralResultPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralResultPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralResultPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
