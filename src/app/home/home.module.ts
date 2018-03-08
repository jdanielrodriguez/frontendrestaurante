import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { LoadersCssModule } from 'angular2-loaders-css';
import { SimpleNotificationsModule } from 'angular2-notifications';

import { HomeRoutingModule } from './home.routing';
import { NavComponent } from './nav.component';
import { AccesosService } from './admin/_services/accesos.service';
import { UsersService } from './admin/_services/users.service';
import { RolesService } from './admin/_services/roles.service';

import { UsuarioGuard } from "./../_guards/usuario.guard";
import { AdminGuard } from "./../_guards/admin.guard";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SimpleNotificationsModule.forRoot(),
    LoadersCssModule,
    HomeRoutingModule
  ],
  declarations: [NavComponent],
  providers: [
    UsuarioGuard,
    AdminGuard,
    AccesosService,
    UsersService,
    RolesService
  ]
})
export class HomeModule { }
