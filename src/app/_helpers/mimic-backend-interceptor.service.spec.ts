import { TestBed } from '@angular/core/testing';

import { MimicBackendInterceptor } from './mimic-backend-interceptor';

describe('MimicBackendInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MimicBackendInterceptor= TestBed.get(MimicBackendInterceptor);
    expect(service).toBeTruthy();
  });
});
