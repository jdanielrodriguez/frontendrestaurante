import { TestBed, inject } from '@angular/core/testing';

import { ComidaIngredientesService } from './comida-ingredientes.service';

describe('ComidaIngredientesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComidaIngredientesService]
    });
  });

  it('should be created', inject([ComidaIngredientesService], (service: ComidaIngredientesService) => {
    expect(service).toBeTruthy();
  }));
});
