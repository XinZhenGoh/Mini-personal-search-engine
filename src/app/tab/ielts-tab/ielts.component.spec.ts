import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IeltsComponent } from './ielts.component';

describe('IeltsComponent', () => {
  let component: IeltsComponent;
  let fixture: ComponentFixture<IeltsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IeltsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IeltsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
