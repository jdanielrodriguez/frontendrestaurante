import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTableModule } from "angular2-datatable";
import { SimpleNotificationsModule } from 'angular2-notifications';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { LoadersCssModule } from 'angular2-loaders-css';
import { ChartsModule } from 'ng2-charts';
import { AngularMultiSelectModule } from 'angular2-multiselect-checkbox-dropdown/angular2-multiselect-dropdown';

import { AdminRoutingModule } from './admin.routing';

import { EmployeesService } from './_services/employees.service';
import { ModulosService } from './_services/modulos.service';
import { SucursalesService } from './_services/sucursales.service';
import { ClientesService } from './_services/clientes.service';
import { CombosService } from './_services/combos.service';
import { ComidaIngredientesService } from './_services/comida-ingredientes.service';
import { ComidasService } from './_services/comidas.service';
import { CuentasService } from './_services/cuentas.service';
import { IngredientesService } from './_services/ingredientes.service';
import { MesasService } from './_services/mesas.service';
import { ComidasMenuService } from './_services/comidas-menu.service';

import { AdminComponent } from './admin.component';
import { LoaderComponent } from './loader/loader.component';
import { PerfilComponent } from './perfil/perfil.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RolesComponent } from './roles/roles.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { SucursalesComponent } from './sucursales/sucursales.component';
import { ModulosComponent } from './modulos/modulos.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { MesasComponent } from './mesas/mesas.component';
import { ComidasComponent } from './comidas/comidas.component';
import { CuentasComponent } from './cuentas/cuentas.component';
import { CombosComponent } from './combos/combos.component';
import { IngredientesComponent } from './ingredientes/ingredientes.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ComidaIngredientesComponent } from './comida-ingredientes/comida-ingredientes.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { OrdenarComidaComponent } from './ordenar-comida/ordenar-comida.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DataTableModule,
    ChartsModule,
    SimpleNotificationsModule.forRoot(),
    Ng2SearchPipeModule,
    LoadersCssModule,
    AngularMultiSelectModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    LoaderComponent,
    PerfilComponent,
    DashboardComponent,
    RolesComponent,
    UsuariosComponent,
    SucursalesComponent,
    ModulosComponent,
    EmpleadosComponent,
    MesasComponent,
    ComidasComponent,
    CuentasComponent,
    CombosComponent,
    IngredientesComponent,
    ClientesComponent,
    ComidaIngredientesComponent,
    EstadisticaComponent,
    OrdenarComidaComponent,
  ],
  providers: [
    EmployeesService,
    ModulosService,
    SucursalesService,
    ClientesService,
    CombosService,
    ComidaIngredientesService,
    ComidasService,
    CuentasService,
    IngredientesService,
    MesasService,
    ComidasMenuService
  ]
})
export class AdminModule { }
