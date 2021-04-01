import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sizes } from 'src/app/interfaces/management-crud.interface';
import { ClothesService } from 'src/app/services/clothes.service';
@Component({
  selector: 'app-clothes-sold',
  templateUrl: './clothes-sold.component.html',
  styleUrls: ['./clothes-sold.component.css']
})
export class ClothesSoldComponent implements OnInit {
  clothesRef: any; 
  private id: string;  
  private size: Sizes | any; 
  constructor(
    private _clothesService: ClothesService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router) {}

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    this._activatedRoute.params.subscribe(params => {
      this.id = params.id;
      this.size = JSON.parse(localStorage.getItem('sizeSelected')); 
      if(!this.size) return this._router.navigateByUrl('/home');
      
      this._clothesService.getOne(params.id).subscribe(clothesDB => {
        this.clothesRef = clothesDB;
        for (let i = 0; i < this.clothesRef.sizes.length; i++) {
          if(this.clothesRef.sizes[i].size.size === this.size.size) {
            if(this.clothesRef.sizes[i].stock < 1) {
              this._router.navigateByUrl(`/home/clothes/failure/${this.id}`); 
            } else {             
              this.clothesRef.sizes[i].stock = this.clothesRef.sizes[i].stock - 1; 
              this._clothesService.setStock(this.id, this.clothesRef.sizes[i].stock, this.size.size).subscribe(() => {}, 
              error => {
                this._router.navigateByUrl(`/home/clothes/failure/${this.id}`); 
              });
            }
          }  
        }
      }); 
      localStorage.removeItem('sizeSelected');
    });
  }
}
