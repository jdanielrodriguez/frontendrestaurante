import { Component, OnInit } from '@angular/core';
import { ComidasService } from "./../_services/comidas.service";
import { ComidaIngredientesService } from "./../_services/comida-ingredientes.service";

import { NotificationsService } from 'angular2-notifications';

declare var $: any

import { path } from "../../../config.module";

@Component({
  selector: 'app-comida-ingredientes',
  templateUrl: './comida-ingredientes.component.html',
  styleUrls: ['./comida-ingredientes.component.css']
})
export class ComidaIngredientesComponent implements OnInit {
  title:string="Comidas"
  Table:any
  idRol=+localStorage.getItem('currentRolId');
  Agregar = +localStorage.getItem('permisoAgregar')
  Modificar = +localStorage.getItem('permisoModificar')
  Eliminar = +localStorage.getItem('permisoEliminar')
  Mostrar = +localStorage.getItem('permisoMostrar')
  selectedData:any
  parentCombo:any
  public rowsOnPage = 5;
  public search:any
  private basePath:string = path.path
  constructor(
    private _service: NotificationsService,
    private mainService: ComidasService,
    private secondService: ComidaIngredientesService
  ) { }

  ngOnInit() {
    this.cargarAll()
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

  insert(formValue:any){
    $('#Loading').css('display','block')
    $('#Loading').addClass('in')
    this.mainService.create(formValue)
                      .then(response => {
                        this.cargarAll()
                        console.clear
                        this.create('Rol Ingresado')
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
    let url = `${this.basePath}/api/comidas/${form.id}/upload/avatar`

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
    $('#Loading').css('display','block')
    $('#Loading').addClass('in')
    this.mainService.getSingle(id)
                      .then(response => {
                        this.selectedData = response;
                        this.cargarIngredientes(response.id);
                        $('#Loading').css('display','none')
                      }).catch(error => {
                        $('#Loading').css('display','none')
                        console.clear
                        this.createError(error)
                      })
  }

  cargarIngredientes(id:number){
    this.secondService.getIngredientes(id)
                      .then(response => {
                        this.parentCombo = response;
                        $('#Loading').css('display','none')
                        // console.log(response);
                      }).catch(error => {
                        $('#Loading').css('display','none')
                        console.clear
                        this.createError(error)
                      })
  }

  cambiarIngre(obj,id,addid){
    $('#Loading').css('display','block')
    $('#Loading').addClass('in')
    let value = $('#'+obj).prop('checked')
    if(value){
      let data = {
        comida: this.selectedData.id,
        ingrediente: id
      }
      this.secondService.create(data)
                      .then(response => {
                        $('#Loading').css('display','none')
                        // console.log(response);
                      }).catch(error => {
                        $('#Loading').css('display','none')
                        console.clear
                        this.createError(error)
                      })
    }else{
      this.secondService.delete(addid)
                      .then(response => {
                        $('#Loading').css('display','none')
                        // console.log(response);
                      }).catch(error => {
                        $('#Loading').css('display','none')
                        console.clear
                        this.createError(error)
                      })
    }
  }

  update(formValue:any){
    $('#Loading').css('display','block')
    $('#Loading').addClass('in')
    //console.log(data)
    this.mainService.update(formValue)
                      .then(response => {
                        this.cargarAll()
                        console.clear
                        this.create('Rol Actualizado exitosamente')
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
                          this.create('Rol Eliminado exitosamente')
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
