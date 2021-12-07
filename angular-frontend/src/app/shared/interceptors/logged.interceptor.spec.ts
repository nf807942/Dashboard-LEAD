import { TestBed } from '@angular/core/testing';

import { LoggedInterceptor } from './logged.interceptor';

describe('LoggedInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      LoggedInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: LoggedInterceptor = TestBed.inject(LoggedInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
