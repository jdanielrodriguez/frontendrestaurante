import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentasPagadasComponent } from './cuentas-pagadas.component';

describe('CuentasPagadasComponent', () => {
  let component: CuentasPagadasComponent;
  let fixture: ComponentFixture<CuentasPagadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentasPagadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentasPagadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
