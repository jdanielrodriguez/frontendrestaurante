import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboIngredientesComponent } from './combo-ingredientes.component';

describe('ComboIngredientesComponent', () => {
  let component: ComboIngredientesComponent;
  let fixture: ComponentFixture<ComboIngredientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComboIngredientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboIngredientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
