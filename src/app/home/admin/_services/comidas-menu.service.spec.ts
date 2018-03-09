import { TestBed, inject } from '@angular/core/testing';

import { ComidasMenuService } from './comidas-menu.service';

describe('ComidasMenuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComidasMenuService]
    });
  });

  it('should be created', inject([ComidasMenuService], (service: ComidasMenuService) => {
    expect(service).toBeTruthy();
  }));
});
