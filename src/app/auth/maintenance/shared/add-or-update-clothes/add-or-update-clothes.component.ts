import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SizesService } from '../../../../services/sizes.service';
import { Sizes, Type, Brand } from '../../../../interfaces/management-crud.interface';
import Clothes from '../../../../interfaces/clothes.interface';
import { ClothesService } from '../../../../services/clothes.service';
import Swal from 'sweetalert2';
import { TypesService } from '../../../../services/types.service';
import { BrandService } from '../../../../services/brand.service';
import { ImgUploadService } from '../../../../services/img-upload.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-or-update-clothes',
  templateUrl: './add-or-update-clothes.component.html',
  styleUrls: ['./add-or-update-clothes.component.css']
})
export class AddOrUpdateClothesComponent implements OnInit {
  @Input() mode: string = 'add'; 
  @Input() clothesRef: Clothes;
  @Input() clothesId: string;
  public elList;
  public sizesList: Sizes[] = [];  
  public brandsList: Brand[] = [];  
  public typesList: Type[] = [];  
  public img: File;
  public formClothes: FormGroup = this._fb.group
  ({ 
    name: ['', [Validators.required]], 
    brand: ['', [Validators.required]], 
    type: ['', [Validators.required]], 
    stock: ['', [Validators.required]], 
    gender: [null, [Validators.required]], 
    sizes: new FormArray([]), 
    price: ['', [Validators.required]]
  });;
  
  constructor
  (
    private _fb: FormBuilder,  
    private _sizesService: SizesService, 
    private _clothesService: ClothesService,
    private _typesService: TypesService,
    private _brandService: BrandService,
    private _imgUploadService: ImgUploadService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._sizesService.getSizes().subscribe(sizes => this.sizesList = sizes); 
    this._typesService.getTypes().subscribe(types => this.typesList = types); 
    this._brandService.getBrands().subscribe(brands => this.brandsList = brands); 
    
    if(this.mode === 'update') this.initToUpdate();
  }
  
  initToUpdate() {
    setTimeout(() => {          
      if(this.clothesRef) {
        this.formClothes = this._fb.group
        ({ 
          name: [this.clothesRef.name || '', [Validators.required]], 
          brand: [this.clothesRef.brand._id || '', [Validators.required]], 
          type: [this.clothesRef.type._id || '', [Validators.required]], 
          stock: [this.clothesRef.stock || '', [Validators.required]], 
          gender: [ this.clothesRef.gender || null, [Validators.required]], 
          sizes: this.clothesRef ? this.setSizes(): new FormArray([]), 
          price: [this.clothesRef.price || '', [Validators.required]]
        }); 
      }
    }, 600);
  }

  setSizes() {
    const elList = document.querySelectorAll('.checkbox');
    let listResult = []; 

    elList.forEach((el:any, i: number) => {
      if(this.clothesRef.sizes) {
        for (let j = 0; j < this.clothesRef.sizes.length; j++) {
          if(el.defaultValue === this.clothesRef.sizes[j]._id) {
            listResult = [...listResult, new FormControl(el.defaultValue)]
            el.checked = true;
          }
        }
      }
      i++;
    });
    
    return new FormArray(listResult);
  }
  
  setImg(img: File): void {
    this.img = img; 
  }

  onCheckChange(e) {
    const formArray: FormArray = this.formClothes.get('sizes') as FormArray; 
    console.log(formArray);
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
    let {name, gender, brand, price, sizes, stock, type} = this.formClothes.value; 
    gender = (gender === 'both') ? ['man', 'woman'] : (gender === 'man') ? gender = ['man'] : ['woman'];
    const  newClothes: Clothes = {name, gender, brand, price, sizes, stock, type}; 
    this._clothesService.addClothes(newClothes)  
      .subscribe((newClothes) => {
        Swal.fire('Se ha agregado la prenda', '', 'success'); 
        this.formClothes.reset();
        if(this.img) this._imgUploadService.imgUpload(this.img, newClothes._id).catch(err => console.log(err));
      }, (err: any) => {
        Swal.fire('Error', `${err.error.msg}`, 'error');
        console.log(err);
      });
  }

  updateClothes(): void {
    let {name, gender, brand, price, sizes, stock, type} = this.formClothes.value; 
    gender = (gender === 'both') ? ['man', 'woman'] : (gender === 'man') ? gender = ['man'] : ['woman'];
    const  clothesToUpdate: Clothes = {name, gender, brand, price, sizes, stock, type}; 

    this._clothesService.updateClothes(this.clothesId, clothesToUpdate)
      .subscribe((clothesUpdated:Clothes) => {
        Swal.fire({
          title: 'Prenda actualizada', 
          html:  `<p>${clothesUpdated.name}</p>`, 
          icon: 'success', 
          showConfirmButton: true, 
          confirmButtonText: 'Aceptar'
        }).then((result) => {
            if(result.isConfirmed) this._router.navigateByUrl('/auth/maintenance');
        });
        
      }, (err:any) => {
        Swal.fire('Error', `${err.error.msg}`, 'error'); 
        console.log(err);
      })
  }
}