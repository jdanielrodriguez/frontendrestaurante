import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from "@angular/router";

import { NotificationsService } from 'angular2-notifications';
import { AccesosService } from "./admin/_services/accesos.service";
import { UsersService } from "./admin/_services/users.service";

declare var $: any

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  user=localStorage.getItem('currentUser');
  firstname=localStorage.getItem('currentFirstName');
  lastname=localStorage.getItem('currentLastName');
  picture=localStorage.getItem('currentPicture');
  id=localStorage.getItem('currentId');
  type=localStorage.getItem('currentType');
  state=localStorage.getItem('currentState');
  rol=localStorage.getItem('currentRol');
  idRol=+localStorage.getItem('currentRolId');
  click:boolean
  notifications:any = []
  nNotifications:number = 0;
  modulos:any
  modulosOcultos:any
  constructor(
    private _service: NotificationsService,
    private route: ActivatedRoute,
    private router: Router,
    private mainService: AccesosService,
    private UsersService: UsersService
  ) { }

  ngOnInit() {
    if(this.state=='21'){
      $('#passwordModal').modal();
    }
    // if(this.type=="tutor"){
    //   this.cargarNotifications();
    // }
    this.cargarModulos();
    // console.log(this.idRol);

  }
  cargarModulos(){
    this.mainService.getAccess(+this.id)
                      .then(response => {
                        if(response.permitidos.length>0){
                          this.modulos = response.permitidos
                        }
                        if(response.ocultos.length>0){
                          this.modulosOcultos = response.ocultos
                        }
                        console.log(response);
                        console.clear
                      }).catch(error => {
                        console.clear
                        this.createError(error)
                      })
  }
  permiso(obj:any){
    localStorage.setItem('permisoAgregar',obj.agregar);
    localStorage.setItem('permisoEliminar',obj.eliminar);
    localStorage.setItem('permisoModificar',obj.modificar);
    localStorage.setItem('permisoMostrar',obj.mostrar);

  }
  cargarNotifications()
  {
    this.nNotifications=0;
    this.notifications.length =0;
    let id=localStorage.getItem('currentIdTutor');
    // this.notificationsService.getTutorAll(+id)
    //                   .then(response => {
    //                     response.forEach(element => {
    //                       if(element.state==3){
    //                         this.nNotifications++;
    //                       }
    //                       if(element.state>=2){
    //                         this.notifications.push(element);
    //                       }
    //                     });
    //                     console.clear
    //                   }).catch(error => {
    //                     console.clear
    //                     this.createError(error)

    //                     $('#Loading').css('display','none')
    //                   })
  }
  updateNotifications(){
    let id=localStorage.getItem('currentIdTutor');
    let form:any = {
      id: id,
      state: 2
    }
    // this.notificationsService.updateByTutor(form)
    //                     .then(response => {
    //                       this.cargarNotifications();
    //                       console.clear
    //                     }).catch(error => {
    //                       console.clear
    //                       this.createError(error)

    //                       $('#Loading').css('display','none')
    //                     })
  }

  updateNotification(id){
    let form:any = {
      id: id,
      state: 1
    }
    // this.notificationsService.update(form)
    //                     .then(response => {
    //                       this.cargarNotifications();
    //                       console.clear
    //                     }).catch(error => {
    //                       console.clear
    //                       this.createError(error)

    //                       $('#Loading').css('display','none')
    //                     })
  }

  updatePass(formValue:any){
    $('#Loading').css('display','block')
    $('#Loading').addClass('in')



    let data = {
      id: this.id,
      old_pass: formValue.old_pass,
      new_pass: formValue.new_pass,
      new_pass_rep: formValue.new_pass_rep
    }
    // console.log(data)
    this.UsersService.updatePass(data)
                      .then(response => {
                        console.clear
                        this.create('Usuario Actualizado exitosamente')
                        $('#Loading').css('display','none')
                        $("#passwordModal .close").click();
                        $('#pass-form')[0].reset()
                        localStorage.setItem('currentState',response.state);
                      }).catch(error => {
                        console.clear
                        this.createError(error)
                        $('#Loading').css('display','none')
                      })

  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentEmail');
    localStorage.removeItem('currentFirstName');
    localStorage.removeItem('currentLastName');
    localStorage.removeItem('currentId');
    localStorage.removeItem('currentType');
    location.reload();
  }
  public options = {
               position: ["bottom", "right"],
               timeOut: 2000,
               lastOnBottom: false,
               animate: "fromLeft",
               showProgressBar: false,
               pauseOnHover: true,
               clickToClose: true,
               maxLength: 200
           };

    create(success) {
                this._service.success('¡Éxito!',success)

    }
    createError(error) {
                this._service.error('¡Error!',error)

    }
}
