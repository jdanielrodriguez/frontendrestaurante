import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from "./admin.component";

import { PerfilComponent } from './perfil/perfil.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RolesComponent } from './roles/roles.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { SucursalesComponent } from './sucursales/sucursales.component';
import { ModulosComponent } from './modulos/modulos.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { ClientesComponent } from './clientes/clientes.component';
import { CombosComponent } from './combos/combos.component';
import { ComidasComponent } from './comidas/comidas.component';
import { ComidaIngredientesComponent } from './comida-ingredientes/comida-ingredientes.component';
import { ComboIngredientesComponent } from './combo-ingredientes/combo-ingredientes.component';
import { CuentasComponent } from './cuentas/cuentas.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { IngredientesComponent } from './ingredientes/ingredientes.component';
import { MesasComponent } from './mesas/mesas.component';
import { OrdenarComidaComponent } from './ordenar-comida/ordenar-comida.component';
import { MenusComponent } from './menus/menus.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '', component: AdminComponent, children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'roles', component: RolesComponent },
    { path: 'usuarios', component: UsuariosComponent },
    { path: 'modulos', component: ModulosComponent },
    { path: 'empleados', component: EmpleadosComponent },
    { path: 'clientes', component: ClientesComponent },
    { path: 'combos', component: CombosComponent },
    { path: 'comidas', component: ComidasComponent },
    { path: 'comida-ingredientes', component: ComidaIngredientesComponent },
    { path: 'combo-ingredientes', component: ComboIngredientesComponent },
    { path: 'cuentas', component: CuentasComponent },
    { path: 'estadistica', component: EstadisticaComponent },
    { path: 'ingredientes', component: IngredientesComponent },
    { path: 'mesas', component: MesasComponent },
    { path: 'ordenar/:id/:nombre', component: OrdenarComidaComponent },
    { path: 'perfil', component: PerfilComponent },
    { path: 'sucursales', component: SucursalesComponent },
    { path: 'menus', component: MenusComponent }
  ]},
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
