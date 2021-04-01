import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Brand } from '../../../../interfaces/management-crud.interface';
import { BrandService } from '../../../../services/brand.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-brands-admin',
  templateUrl: './brands-admin.component.html',
  styleUrls: ['./brands-admin.component.css']
})
export class BrandsAdminComponent implements OnInit {

  public formBrand = this._fb.group({
    name: ['', Validators.required] 
  });
  
  public brandsList: Brand[] = []; 
  
  constructor(private _fb: FormBuilder, private _brandService: BrandService) { }
  
  ngOnInit(): void {
    this.getBrands(); 
  }

  getBrands() {
    this._brandService.getBrands()
      .subscribe((brands: Brand[]) => {
        this.brandsList = brands; 
      }, (err: any) => {
        Swal.fire('Ocurrio un error', `<p>${err.error.msg}</p>`, 'error'); 
      });
  }

  addBrand(): void {
    this._brandService.addBrand(this.formBrand.value)
      .subscribe((newBrand: Brand) => {
        Swal.fire('Marca agregada!', `<p>Marca: ${newBrand.name}</p>`, 'success');
        this.formBrand.setValue({name: ''});
        this.getBrands();
      }, (err: any) => {
        Swal.fire('Ocurrio un error', `<p>${err.error.msg}</p>`, 'error'); 
      });
  }

  updateBrand(brand: Brand, newValue): void {
    if(newValue === '') {
      return;
    }
    brand.name = newValue;
    this._brandService.updateBrand(brand)
      .subscribe((brandUpdated: any) => {
        Swal.fire('Marca actualizada: ', `<p>Nuevo valor: ${brandUpdated.name}</p>`, 'success'); 
        this.getBrands();
      }, (err: any) => {
        Swal.fire('Ocurrio un error', `<p>${err.error.msg}</p>`, 'error'); 
      }); 
  }

  deleteBrand(brand: Brand): void {
    Swal.fire({
      title: 'Alerta',
      icon: 'warning', 
      text: 'Esta seguro de que desea eliminar esta marca?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',  
      showConfirmButton: true, 
      confirmButtonText: 'Confirmar',
      allowOutsideClick: () => !Swal.isLoading()
    }).then(res => {
      if(res.isConfirmed) { 
        this._brandService.deleteBrand(brand._id)
          .subscribe((brandDeleted: Brand) => {
            Swal.fire('Eliminado', `<p>Marca: ${brandDeleted.name}</p>`, 'success');
            this.getBrands(); 
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
