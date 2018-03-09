import { TestBed, inject } from '@angular/core/testing';

import { ComidasService } from './comidas.service';

describe('ComidasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComidasService]
    });
  });

  it('should be created', inject([ComidasService], (service: ComidasService) => {
    expect(service).toBeTruthy();
  }));
});
