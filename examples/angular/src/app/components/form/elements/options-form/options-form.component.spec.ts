import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsFormComponent } from './options-form.component';

describe('OptionsFormComponent', () => {
  let component: OptionsFormComponent;
  let fixture: ComponentFixture<OptionsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
