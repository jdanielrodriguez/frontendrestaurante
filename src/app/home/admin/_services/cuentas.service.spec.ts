import { TestBed, inject } from '@angular/core/testing';

import { CuentasService } from './cuentas.service';

describe('CuentasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CuentasService]
    });
  });

  it('should be created', inject([CuentasService], (service: CuentasService) => {
    expect(service).toBeTruthy();
  }));
});
