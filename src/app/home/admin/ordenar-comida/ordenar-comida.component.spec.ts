import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenarComidaComponent } from './ordenar-comida.component';

describe('OrdenarComidaComponent', () => {
  let component: OrdenarComidaComponent;
  let fixture: ComponentFixture<OrdenarComidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenarComidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenarComidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
