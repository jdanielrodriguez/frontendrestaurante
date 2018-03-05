import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from "@angular/router";

import { NotificationsService } from 'angular2-notifications';

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
    private router: Router
  ) { }

  ngOnInit() {
   $('body').removeClass('login-page')
   $('body').css('height','100%')
   console.log(this.firstname);

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
