import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToInputComponent } from './to-input.component';

describe('ToInputComponent', () => {
  let component: ToInputComponent;
  let fixture: ComponentFixture<ToInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
