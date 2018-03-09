import { TestBed, inject } from '@angular/core/testing';

import { IngredientesService } from './ingredientes.service';

describe('IngredientesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IngredientesService]
    });
  });

  it('should be created', inject([IngredientesService], (service: IngredientesService) => {
    expect(service).toBeTruthy();
  }));
});
