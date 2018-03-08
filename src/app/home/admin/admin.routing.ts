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

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '', component: AdminComponent, children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'roles', component: RolesComponent },
    { path: 'usuarios', component: UsuariosComponent },
    { path: 'modulos', component: ModulosComponent },
    { path: 'empleados', component: EmpleadosComponent },
    { path: 'perfil', component: PerfilComponent },
    { path: 'sucursales', component: SucursalesComponent }
  ]},
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
