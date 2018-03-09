import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComidaIngredientesComponent } from './comida-ingredientes.component';

describe('ComidaIngredientesComponent', () => {
  let component: ComidaIngredientesComponent;
  let fixture: ComponentFixture<ComidaIngredientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComidaIngredientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComidaIngredientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
