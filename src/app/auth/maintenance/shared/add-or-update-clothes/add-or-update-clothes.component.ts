import { Component, OnInit, Input, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SizesService } from '../../../../services/sizes.service';
import { Sizes, Type, Brand } from '../../../../interfaces/management-crud.interface';
import Clothes from '../../../../interfaces/clothes.interface';
import { ClothesService } from '../../../../services/clothes.service';
import Swal from 'sweetalert2';
import { TypesService } from '../../../../services/types.service';
import { BrandService } from '../../../../services/brand.service';
import { ImgUploadService } from '../../../../services/img-upload.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-add-or-update-clothes',
  templateUrl: './add-or-update-clothes.component.html',
  styleUrls: ['./add-or-update-clothes.component.css']
})
export class AddOrUpdateClothesComponent implements OnInit {
  @Input() mode: string = 'add'; 
  clothesRef: Clothes;
  documentReady = false;
  @Input() clothesId: string;
  @ViewChildren('btnSizes') btnSizes: any[]; 
  sizesRefList = [];
  public elList;
  public sizesList: Sizes[] = [];  
  public brandsList: Brand[] = [];  
  public typesList: Type[] = [];  
  public img: File;
  public formClothes: FormGroup;
  
  constructor
  (
    private _fb: FormBuilder,  
    private _sizesService: SizesService, 
    private _clothesService: ClothesService,
    private _typesService: TypesService,
    private _brandService: BrandService,
    private _imgUploadService: ImgUploadService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._sizesService.getSizes().subscribe(sizes => this.sizesList = sizes); 
    this._typesService.getTypes().subscribe(types => this.typesList = types); 
    this._brandService.getBrands().subscribe(brands => this.brandsList = brands);
    
    this._activatedRoute.params.subscribe(params => {
      if(params.id) this.getOne(params.id);
      else {
        this.formClothes = this._fb.group
          ({ 
            name: ['', [Validators.required]], 
            brand: ['', [Validators.required]], 
            type: ['', [Validators.required]], 
            gender: [null, [Validators.required]], 
            sizes: [new FormArray([]), [Validators.minLength(1)]], 
            price: ['', [Validators.required]]
          });
        this.documentReady = true;
      }

    });
    
  }

  getOne(id: string) {
    this._clothesService.getOne(id)
      .subscribe(res => {
        this.clothesRef = res;
        this.initToUpdate();
      }); 
    }
  
  initToUpdate() {
    if(this.clothesRef) {
      this.formClothes = this._fb.group
      ({ 
        name: [this.clothesRef.name || '', [Validators.required]], 
        brand: [this.clothesRef.brand._id || '', [Validators.required]], 
        type: [this.clothesRef.type._id || '', [Validators.required]], 
        gender: [ this.clothesRef.gender || null, [Validators.required]], 
        sizes: [this.clothesRef ? this.setSizes(): new FormArray([]), Validators.minLength(1)], 
        price: [this.clothesRef.price || '', [Validators.required]]
      }); 
    }
  }

  setSizes() {
    this.sizesList.forEach((size:Sizes) => {
      for (let j = 0; j < this.clothesRef.sizes.length; j++) {
        if(size.size === this.clothesRef.sizes[j].size.size) {
          size.temporalStock = this.clothesRef.sizes[j].stock;
        }
      }
    });
    this.documentReady = true;
    return new FormArray([]);
  }
  
  setImg(img: File): void {
    this.img = img; 
  }

  addSizeToList(e, size: Sizes, stock: number) {
    e.preventDefault();  
    if(stock < 0 || !stock) return Swal.fire('error', 'no se permiten numeros negativos o valores invalidos', 'error');
    size.temporalStock = stock;
    const formArray:FormArray = this.formClothes.get('sizes').value as FormArray;
    formArray.push(new FormControl(size));
    e.target.disabled = true;
    e.target.previousElementSibling.readOnly = true;
    e.target.textContent = 'Elegido';
  }

  addClothes(): void {
    let {name, gender, brand, price, sizes: sizesControls, type} = this.formClothes.value; 
    let sizes = [];
    sizesControls.controls.forEach((sizeControl:any) => {
      const {temporalStock, ...object} = sizeControl.value;
      const sizeData = {
          stock: temporalStock, 
          size: object
      };
      sizes = [...sizes, sizeData]
    });
    gender = (gender === 'man') ? ['man'] : ['woman'];
    const  newClothes: Clothes = {name, gender, brand, price, sizes, type}; 
    this._clothesService.addClothes(newClothes)  
      .subscribe((newClothes) => {
        Swal.fire('Se ha agregado la prenda', '', 'success'); 
        if(this.img) {
          this._imgUploadService.imgUpload(this.img, newClothes._id).catch(err => console.log(err));
        }
        this.formClothes.reset();
        this.btnSizes.forEach(btn => btn.nativeElement.textContent = 'Elegir');
      }, (err: any) => {
        Swal.fire('Error', `${err.error.msg}`, 'error');
        console.log(err);
      });
  }

  updateClothes(): void { 
    let {name, gender, brand, price, sizes: sizesControls, type} = this.formClothes.value; 
    let sizes = [];
    sizesControls.controls.forEach((sizeControl:any) => {
      const {temporalStock, ...object} = sizeControl.value;
      const sizeData = {
          stock: temporalStock, 
          size: object
      };
      sizes = [...sizes, sizeData];
    });
    gender = (gender === 'man') ? ['man'] : ['woman'];
    const  clothesToUpdate: Clothes = {name, gender, brand, price, sizes, type}; 

    this._clothesService.updateClothes(this.clothesId, clothesToUpdate)
      .subscribe((clothesUpdated:Clothes) => {
        if(this.img) {
          this._imgUploadService.imgUpload(this.img, this.clothesId).catch(err => console.log(err));
        }
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