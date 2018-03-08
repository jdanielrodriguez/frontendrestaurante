import { Component, OnInit } from '@angular/core';
import { UsersService } from "./../_services/users.service";
import { EmployeesService } from "./../_services/employees.service";
import { RolesService } from "./../_services/roles.service";
import { AccesosService } from "./../_services/accesos.service";
import { ModulosService } from '../_services/modulos.service';

import { NotificationsService } from 'angular2-notifications';

declare var $: any

import { path } from "../../../config.module";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  title:string="Usuarios"
  Table:any
  selectedData:any
  parentCombo:any
  secondParentCombo:any
  modulos:any = []
  idRol=+localStorage.getItem('currentRolId');
  Agregar = +localStorage.getItem('permisoAgregar')
  Modificar = +localStorage.getItem('permisoModificar')
  Eliminar = +localStorage.getItem('permisoEliminar')
  Mostrar = +localStorage.getItem('permisoMostrar')
  public rowsOnPage = 5;
  public search:any
  private basePath:string = path.path
  dateToday:any
  dropdownList = [];
  selectedItem = [];
  selectedItems = [];
  dropdownSettings = [];
  constructor(
    private _service: NotificationsService,
    private mainService: UsersService,
    private parentService: EmployeesService,
    private secondParentService: RolesService,
    private secondChildService: ModulosService,
    private childService: AccesosService
  ) { }

  ngOnInit() {
    this.cargarAll()
    this.cargarParentCombo()
    this.cargarSecondParentCombo()
    this.dropdownList = [
      {"id":1,"itemName":"Mostrar"},
      {"id":2,"itemName":"Agregar"},
      {"id":3,"itemName":"Modificar"},
      {"id":4,"itemName":"Eliminar"}
    ];
  }
    onItemSelect(id:any,event){
      let data:any;
      switch(event.itemName){
        case 'Agregar' : {
          data = {
            usuario : this.selectedData.id,
            modulo : id,
            agregar : 1
          }
          break;
        }
        case 'Modificar' : {
          data = {
            usuario : this.selectedData.id,
            modulo : id,
            modificar : 1
          }
          break;
        }
        case 'Eliminar' : {
          data = {
            usuario : this.selectedData.id,
            modulo : id,
            eliminar : 1
          }
          break;
        }
        case 'Mostrar' : {
          data = {
            usuario : this.selectedData.id,
            modulo : id,
            mostrar : 1
          }
          break;
        }
      }
      $('#Loading').css('display','block')
      $('#Loading').addClass('in')
      this.childService.create(data)
                      .then(response => {
                        $('#Loading').css('display','none')
                        console.clear
                      }).catch(error => {
                        console.clear
                        this.createError(error)
                        $('#Loading').css('display','none')
                      })
      // console.log(data);

    }
    OnItemDeSelect(id:any,event){
      let data:any;
      switch(event.itemName){
        case 'Agregar' : {
          data = {
            usuario : this.selectedData.id,
            modulo : id,
            agregar : 0
          }
          break;
        }
        case 'Modificar' : {
          data = {
            usuario : this.selectedData.id,
            modulo : id,
            modificar : 0
          }
          break;
        }
        case 'Eliminar' : {
          data = {
            usuario : this.selectedData.id,
            modulo : id,
            eliminar : 0
          }
          break;
        }
        case 'Mostrar' : {
          data = {
            usuario : this.selectedData.id,
            modulo : id,
            mostrar : 0
          }
          break;
        }
      }
      $('#Loading').css('display','block')
      $('#Loading').addClass('in')
      this.childService.create(data)
                      .then(response => {
                        $('#Loading').css('display','none')
                        console.clear
                      }).catch(error => {
                        console.clear
                        this.createError(error)
                        $('#Loading').css('display','none')
                      })
      // console.log(data);
    }
    onSelectAll(items: any){
    }
    onDeSelectAll(id: any){

    }
  cargarAll(){
    $('#Loading').css('display','block')
    $('#Loading').addClass('in')
    this.mainService.getAll()
                      .then(response => {
                        this.Table = response
                        $("#editModal .close").click();
                        $("#insertModal .close").click();
                        $('#Loading').css('display','none')
                        console.clear
                      }).catch(error => {
                        console.clear
                        this.createError(error)
                        $('#Loading').css('display','none')
                      })
  }

  cargarAccesos(id){
    $('#Loading').css('display','block')
    $('#Loading').addClass('in')
    this.secondChildService.getAll()
                      .then(response => {
                        this.modulos.length =0;
                        response.forEach(element => {
                          element.accesos = []
                          this.childService.getModuleAccess(id,element.id)
                                            .then(response1 => {
                                              this.selectedItem.length=0;
                                              let cont=1;
                                              if(response1.mostrar=='1'){(element.accesos.push({"id":1,"itemName":"Mostrar"})); cont++}
                                              if(response1.agregar=='1'){(element.accesos.push({"id":2,"itemName":"Agregar"})); cont++}
                                              if(response1.modificar=='1'){(element.accesos.push({"id":3,"itemName":"Modificar"})); cont++}
                                              if(response1.eliminar=='1'){(element.accesos.push({"id":4,"itemName":"Eliminar"})); cont++}
                                              // console.log(element.accesos);
                                              this.dropdownSettings[element.id] = {
                                                singleSelection: false,
                                                text: element.nombre,
                                                selectAllText:'Seleccionar Todos',
                                                unSelectAllText:'Deseleccionar Todos',
                                                enableSearchFilter: false,
                                                classes:"myclass custom-class"
                                              };
                                              this.modulos.push(element)
                                              // console.log(element.accesos);
                                            }).catch(error => {
                                              this.dropdownSettings[element.id] = {
                                                singleSelection: false,
                                                text: element.nombre,
                                                selectAllText:'Seleccionar Todos',
                                                unSelectAllText:'Deseleccionar Todos',
                                                enableSearchFilter: false,
                                                classes:"myclass custom-class"
                                              };
                                              this.modulos.push(element)
                                              $('#Loading').css('display','none')
                                            })


                        });
                        // console.log(response);
                        // console.log(this.modulos);

                        $('#Loading').css('display','none')
                        console.clear
                      }).catch(error => {
                        console.clear
                        this.createError(error)
                        $('#Loading').css('display','none')
                      })
  }

  cargarParentCombo(){
    this.parentService.getAll()
                      .then(response => {
                        this.parentCombo = response
                        console.clear
                      }).catch(error => {
                        console.clear
                        this.createError(error)
                      })
  }

  cargarSecondParentCombo(){
    this.secondParentService.getAll()
                      .then(response => {
                        this.secondParentCombo = response
                        console.clear
                      }).catch(error => {
                        console.clear
                        this.createError(error)
                      })
  }

  insert(formValue:any){
    $('#Loading').css('display','block')
    $('#Loading').addClass('in')
    let pass = this.generar(25)
    let data = {
      username: formValue.username,
      email: formValue.email,
      rol: formValue.rol,
      empleado: formValue.empleado,
      privileges: formValue.privileges,
      password: pass,
    }
    this.mainService.create(data)
                      .then(response => {
                        this.cargarAll()
                        console.clear
                        this.create('Usuario Ingresado')
                        $('#Loading').css('display','none')
                        $('#insert-form')[0].reset()

                      }).catch(error => {
                        console.clear
                        this.createError(error)
                        $('#Loading').css('display','none')
                      })


  }

  subirImagenes(archivo,form,id){
    $('#Loading').css('display','block')
    $('#Loading').addClass('in')
    var archivos=archivo.srcElement.files;
    let url = `${this.basePath}/api/usuarios/${form.id}/upload/avatar`

    var i=0;
    var size=archivos[i].size;
    var type=archivos[i].type;
        if(size<(2*(1024*1024))){
          if(type=="image/png" || type=="image/jpeg" || type=="image/jpg"){
        $("#"+id).upload(url,
            {
              avatar: archivos[i]
          },
          function(respuesta)
          {
            $('#imgAvatar').attr("src",'')
            $('#imgAvatar').attr("src",respuesta.picture)
            $('#Loading').css('display','none')
            $("#"+id).val('')
            $("#barra_de_progreso").val(0)

          },
          function(progreso, valor)
          {

            $("#barra_de_progreso").val(valor);
          }
        );
          }else{
            this.createError("El tipo de imagen no es valido")
            $('#Loading').css('display','none')
          }
      }else{
        this.createError("La imagen es demaciado grande")
        $('#Loading').css('display','none')
      }
  }

  cargarSingle(id:number){
    this.mainService.getSingle(id)
                      .then(response => {
                        this.selectedData = response;
                        this.cargarAccesos(id)
                      }).catch(error => {
                        console.clear
                        this.createError(error)
                      })
  }
  deshabilitar(id:number,estado:any){
    $('#Loading').css('display','block')
    $('#Loading').addClass('in')
    //console.log(data)
    let formValue:any = {
      estado:estado,
      id:id
    }
    this.mainService.update(formValue)
                      .then(response => {
                        this.cargarAll()
                        console.clear
                        this.create('Usuario Actualizado exitosamente')
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
                        this.create('Usuario Actualizado exitosamente')
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
    if(confirm("¿Desea eliminar el Usuario?")){
      this.mainService.delete(id)
                        .then(response => {
                          this.cargarAll()
                          console.clear
                          this.create('Usuario Eliminado exitosamente')
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

  generar(longitud)
  {
    let i:number
    var caracteres = "123456789+/-*abcdefghijkmnpqrtuvwxyz123456789+/-*ABCDEFGHIJKLMNPQRTUVWXYZ12346789+/-*";
    var contraseña = "";
    for (i=0; i<longitud; i++) contraseña += caracteres.charAt(Math.floor(Math.random()*caracteres.length));
    return contraseña;
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
