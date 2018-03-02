import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { AuthService } from "./../_services/auth.service";

import { NotificationsService } from 'angular2-notifications';

declare var $: any

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent implements OnInit {
auth:any
closeResult: string;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService,
    private _service: NotificationsService) { }

    public options = {
    position: ["bottom", "right"],
    timeOut: 3000,
    showProgressBar: false,
    pauseOnHover: true,
    clickToClose: true,
    lastOnBottom: false,
    preventDuplicates: true,
    animate: "scale",
    maxLength: 400
  };

  create(text) {
         this._service.error('Error!',text)

  }
  ngOnInit() {
  }

}
