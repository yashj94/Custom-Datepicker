import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDatePickerComponent } from './my-date-picker.component';

describe('MyDatePickerComponent', () => {
  let component: MyDatePickerComponent;
  let fixture: ComponentFixture<MyDatePickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyDatePickerComponent]
    });
    fixture = TestBed.createComponent(MyDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
