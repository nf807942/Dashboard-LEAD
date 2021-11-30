import { TestBed } from '@angular/core/testing';

import { CreateEditDeleteDialogService } from './create-edit-delete-dialog.service';

describe('CreateEditDeleteDialogService', () => {
  let service: CreateEditDeleteDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateEditDeleteDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
