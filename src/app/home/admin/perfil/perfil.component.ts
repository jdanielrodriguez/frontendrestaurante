import { Component, OnInit } from '@angular/core';
import { UsersService } from "./../_services/users.service";

import { NotificationsService } from 'angular2-notifications';

declare var $: any

import { path } from "../../../config.module";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  title:string="Usuarios"
  Table:any
  selectedData:any
  parentCombo:any
  secondParentCombo:any
  id:any = localStorage.getItem('currentId')
  public rowsOnPage = 5;
  public search:any
  private basePath:string = path.path
  dateToday:any
  constructor(
    private _service: NotificationsService,
    private mainService: UsersService
  ) { }

  ngOnInit() {
    this.cargarSingle(this.id)
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
            localStorage.setItem('currentPicture', respuesta.picture);

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

  updatePass(formValue:any){
    $('#Loading').css('display','block')
    $('#Loading').addClass('in')



    let data = {
      id: this.id,
      old_pass: formValue.old_pass,
      new_pass: formValue.new_pass,
      new_pass_rep: formValue.new_pass_rep
    }
    //console.log(data)
    this.mainService.updatePass(data)
                      .then(response => {
                        console.clear
                        this.create('Usuario Actualizado exitosamente')
                        $('#Loading').css('display','none')

                        $('#pass-form')[0].reset()

                      }).catch(error => {
                        console.clear
                        this.createError(error)
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
