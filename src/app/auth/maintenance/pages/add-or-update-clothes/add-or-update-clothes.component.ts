import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SizesService } from '../../../../services/sizes.service';
import { Sizes } from '../../../../interfaces/clothes.interface';
import Clothes from '../../../../interfaces/clothes.interface';
import { ClothesService } from '../../../../services/clothes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-or-update-clothes',
  templateUrl: './add-or-update-clothes.component.html',
  styleUrls: ['./add-or-update-clothes.component.css']
})
export class AddOrUpdateClothesComponent implements OnInit {
  public titleMode: string = 'Agregar una prenda';
  public sizesList: Sizes[] = [];  
  public clothesRef: Clothes;

  public formClothes = this._fb.group({
    img: [''], 
    name: ['', [Validators.required]], 
    brand: ['', [Validators.required]], 
    type: ['', [Validators.required]], 
    stock: ['', [Validators.required]], 
    gender: [null, [Validators.required]], 
    sizes: new FormArray([]), 
    price: ['', [Validators.required]]
  }); 
  
  constructor(private _fb: FormBuilder,  private _sizesService: SizesService, private _clothesService: ClothesService) { }

  ngOnInit(): void {
    this._sizesService.getSizes().subscribe(sizes => this.sizesList = sizes); 
  }

  onCheckChange(e) {
    const formArray: FormArray = this.formClothes.get('sizes') as FormArray; 
    if(e.target.checked) {
      formArray.push(new FormControl(e.target.value));
    } else {
      for(let i = 0; i < formArray.controls.length; i++) {
        if(formArray.controls[i] == e.target.value) {
          formArray.removeAt(i); 
          return; 
        }
      }
    }
  }

  addClothes(): void {
    this._clothesService.addClothes(this.formClothes.value) 
      .subscribe(res => {
        Swal.fire('Se ha agregado la prenda', '', 'success'); 
        console.log(res); 
      }, (err: any) => {
        Swal.fire('Error', `${err.error.msg}`, 'error');
        console.log(err);
      });

  }
}
