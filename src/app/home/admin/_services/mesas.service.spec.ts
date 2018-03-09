import { TestBed, inject } from '@angular/core/testing';

import { MesasService } from './mesas.service';

describe('MesasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MesasService]
    });
  });

  it('should be created', inject([MesasService], (service: MesasService) => {
    expect(service).toBeTruthy();
  }));
});
