import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SizesService } from '../../../../services/sizes.service';
import { Sizes } from '../../../../interfaces/clothes.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sizes-zone',
  templateUrl: './sizes-zone.component.html',
  styleUrls: ['./sizes-zone.component.css']
})

export class SizesZoneComponent implements OnInit {

  public formSizes = this._fb.group({
    size: ['', Validators.required] 
  });
  
  public sizesList: Sizes[] = []; 
  
  constructor(private _fb: FormBuilder, private _sizesService: SizesService) { }
  
  ngOnInit(): void {
    this.getSizes(); 
  }

  getSizes() {
    this._sizesService.getSizes()
      .subscribe((sizes: Sizes[]) => {
        this.sizesList = sizes; 
      }, (err: any) => {
        Swal.fire('Ocurrio un error', `<p>${err.error.msg}</p>`, 'error'); 
      });
  }

  addSize(): void {
    this._sizesService.addSize(this.formSizes.value)
      .subscribe((newSize: Sizes) => {
        Swal.fire('Talle agregado!', `<p>Talle: ${newSize.size}</p>`, 'success');
        this.formSizes.setValue({size: ''});
        this.getSizes();
      }, (err: any) => {
        Swal.fire('Ocurrio un error', `<p>${err.error.msg}</p>`, 'error'); 
      });
  }

  updateSize(size: Sizes, newValue): void {
    size.size = newValue;
    this._sizesService.updateSize(size)
      .subscribe((sizeUpdated: any) => {
        Swal.fire('Talle actualizado: ', `<p>Nuevo valor: ${sizeUpdated.size}</p>`, 'success'); 
        this.getSizes();
      }, (err: any) => {
        Swal.fire('Ocurrio un error', `<p>${err.error.msg}</p>`, 'error'); 
      }); 
  }

  deleteSize(size: Sizes): void {
    Swal.fire({
      title: 'Alerta',
      icon: 'warning', 
      text: 'Esta seguro de que desea eliminar este talle?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',  
      showConfirmButton: true, 
      confirmButtonText: 'Confirmar',
      allowOutsideClick: () => !Swal.isLoading()
    }).then(res => {
      if(res.isConfirmed) { 
        this._sizesService.deleteSize(size._id)
          .subscribe((sizeDeleted: Sizes) => {
            Swal.fire('Eliminado', `<p>Talle: ${sizeDeleted.size}</p>`, 'success');
            this.getSizes(); 
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
