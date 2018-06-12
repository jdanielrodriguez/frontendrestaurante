import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import { ComidasService } from "./../_services/comidas.service";
import { MenusService } from "./../_services/menus.service";
import { ComidasMenuService } from "./../_services/comidas-menu.service";

import { NotificationsService } from 'angular2-notifications';
import { Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';

declare var $: any

@Component({
  selector: 'app-ordenar-comida',
  templateUrl: './ordenar-comida.component.html',
  styleUrls: ['./ordenar-comida.component.css']
})
export class OrdenarComidaComponent implements OnInit {
  @Input() id:any;
  Table:any
  comidas:any
  nombreMesa:any = ''
  title:string
  idMesa:any = ''
  nuevo:any = 0
  idRol=+localStorage.getItem('currentRolId');
  Agregar = +localStorage.getItem('permisoAgregar')
  Modificar = +localStorage.getItem('permisoModificar')
  Eliminar = +localStorage.getItem('permisoEliminar')
  Mostrar = +localStorage.getItem('permisoMostrar')
  selectedData:any
  public rowsOnPage = 5;
  public search:any
  constructor(
    private _service: NotificationsService,
    private route: ActivatedRoute,
    private location:Location,
    private router:Router,
    private mainService: MenusService,
    private childService: ComidasService,
    private secondChildService: ComidasMenuService
  ) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => (params['id']))
      .subscribe(response => {
                        this.idMesa+=response
                    });
    this.route.params
      .switchMap((params: Params) => (params['nombre']))
      .subscribe(response => {
                        this.nombreMesa+=response
                    });
    this.title="Orden para cuenta No. "+this.nombreMesa
    this.cargarAll()
  }

  cargarAll(){
    $('#Loading').css('display','block')
    $('#Loading').addClass('in')
    this.mainService.getAllByCuenta(this.idMesa)
                      .then(response => {
                        this.Table = response
                        $('#Loading').css('display','none')
                        console.clear
                      }).catch(error => {
                        console.clear
                        this.createError(error)
                        $('#Loading').css('display','none')
                      })
  }

  insert(formValue:any){
    $('#Loading').css('display','block')
    $('#Loading').addClass('in')
    formValue.cuenta = this.idMesa;
    formValue.costo = 0;
    this.mainService.create(formValue)
                      .then(response => {
                        this.cargarAll()
                        console.clear
                        this.create('Menu Ingresado')
                        $("#insertModal .close").click();
                        $('#Loading').css('display','none')
                        $('#insert-form')[0].reset()
                      }).catch(error => {
                        console.clear
                        this.createError(error)
                        $('#Loading').css('display','none')
                      })


  }
  agregarComida(data)
  {

    let formValue = {
      comida: data.id,
      menu:this.selectedData.id,
      costo:0
    }
    if(data.agregado==0){
      data.agregado=1
      this.secondChildService.create(formValue)
                        .then(response => {
                          data.addId = response.id
                          console.clear
                          this.create('Menu Ingresado')
                          $('#Loading').css('display','none')
                        }).catch(error => {
                          console.clear
                          this.createError(error)
                          $('#Loading').css('display','none')
                        })
    }else{
      data.agregado=0
      this.secondChildService.delete(data.addId)
                        .then(response => {
                          console.clear
                          this.create('Menu Ingresado')
                          $('#Loading').css('display','none')
                        }).catch(error => {
                          console.clear
                          this.createError(error)
                          $('#Loading').css('display','none')
                        })
    }
  }
  cargarSingle(data){
    $('#Loading').css('display','block')
    $('#Loading').addClass('in')
    this.selectedData = data
    let id:number = data.id
    this.childService.getComidasByMenu(id)
                      .then(response => {
                        this.comidas = response;
                        $('#Loading').css('display','none')
                      }).catch(error => {
                        console.clear
                        this.createError(error)
                        $('#Loading').css('display','none')
                      })
  }

  update(formValue:any){
    $('#Loading').css('display','block')
    $('#Loading').addClass('in')
    //console.log(data)
    this.mainService.update(formValue)
                      .then(response => {
                        this.cargarAll()
                        console.clear
                        $("#editModal .close").click();
                        this.create('Menu Actualizado exitosamente')
                        $('#Loading').css('display','none')
                      }).catch(error => {
                        console.clear
                        this.createError(error)
                        $('#Loading').css('display','none')
                      })

  }

  delete(id:string){
    $('#Loading').css('display','block')
    $('#Loading').addClass('in')
    if(confirm("¿Desea eliminar el Rol?")){
      this.mainService.delete(id)
                        .then(response => {
                          this.cargarAll()
                          console.clear
                          this.create('Menu Eliminado exitosamente')
                          $('#Loading').css('display','none')
                        }).catch(error => {
                          console.clear
                          this.createError(error)
                          $('#Loading').css('display','none')
                        })
    }else{
      $('#Loading').css('display','none')
    }

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
