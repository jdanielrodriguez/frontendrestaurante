import { TestBed, inject } from '@angular/core/testing';

import { ComidasMenuIngredienteService } from './comidas-menu-ingrediente.service';

describe('ComidasMenuIngredienteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComidasMenuIngredienteService]
    });
  });

  it('should be created', inject([ComidasMenuIngredienteService], (service: ComidasMenuIngredienteService) => {
    expect(service).toBeTruthy();
  }));
});
