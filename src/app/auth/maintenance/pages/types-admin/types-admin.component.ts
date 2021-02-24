import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TypesService } from '../../../../services/types.service';
import { Type } from '../../../../interfaces/management-crud.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-types-admin',
  templateUrl: './types-admin.component.html',
  styleUrls: ['./types-admin.component.css']
})
export class TypesAdminComponent implements OnInit {

  public formTypes = this._fb.group({
    type: ['', Validators.required] 
  });
  
  public typesList: Type[] = []; 
  
  constructor(private _fb: FormBuilder, private _typesService: TypesService) { }
  
  ngOnInit(): void {
    this.getTypes(); 
  }

  getTypes() {
    this._typesService.getTypes()
      .subscribe((types: Type[]) => {
        this.typesList = types; 
      }, (err: any) => {
        Swal.fire('Ocurrio un error', `<p>${err.error.msg}</p>`, 'error'); 
      });
  }

  addType(): void {
    this._typesService.addType(this.formTypes.value)
      .subscribe((newType: Type) => {
        Swal.fire('Tipo de prenda agregado!', `<p>Tipo de prenda: ${newType.type}</p>`, 'success');
        this.formTypes.setValue({type: ''});
        this.getTypes();
      }, (err: any) => {
        Swal.fire('Ocurrio un error', `<p>${err.error.msg}</p>`, 'error'); 
      });
  }

  updateType(type: Type, newValue): void {
    type.type = newValue;
    this._typesService.updateType(type)
      .subscribe((typeUpdated: any) => {
        Swal.fire('Talle actualizado: ', `<p>Nuevo valor: ${typeUpdated.type}</p>`, 'success'); 
        this.getTypes();
      }, (err: any) => {
        Swal.fire('Ocurrio un error', `<p>${err.error.msg}</p>`, 'error'); 
      }); 
  }

  deleteType(type: Type): void {
    Swal.fire({
      title: 'Alerta',
      icon: 'warning', 
      text: 'Esta seguro de que desea eliminar este tipo de prenda?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',  
      showConfirmButton: true, 
      confirmButtonText: 'Confirmar',
      allowOutsideClick: () => !Swal.isLoading()
    }).then(res => {
      if(res.isConfirmed) { 
        this._typesService.deleteType(type._id)
          .subscribe((typeDeleted: Type) => {
            Swal.fire('Eliminado', `<p>Tipo de prenda: ${typeDeleted.type}</p>`, 'success');
            this.getTypes(); 
          }, (err: any) => {
            console.log(err); 
            Swal.fire('Ocurrio un error', `<p>${err.error.msg}</p>`, 'error');              
          });
      }
    }).catch(err => {
      console.log(err); 
      Swal.fire('Ocurrio un error', `<p>${err.error.msg}</p>`, 'error');
    });
  }

}
