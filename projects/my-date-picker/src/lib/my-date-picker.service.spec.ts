import { TestBed } from '@angular/core/testing';

import { MyDatePickerService } from './my-date-picker.service';

describe('MyDatePickerService', () => {
  let service: MyDatePickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyDatePickerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
