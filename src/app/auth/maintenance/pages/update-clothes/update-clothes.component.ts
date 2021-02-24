import { Component } from '@angular/core';
import { ClothesService } from '../../../../services/clothes.service';
import Clothes from '../../../../interfaces/clothes.interface';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-update-clothes',
  templateUrl: './update-clothes.component.html',
  styleUrls: ['./update-clothes.component.css']
})
export class UpdateClothesComponent{
  public clothesRef: Clothes;
  public _id: string;
  constructor(private _clothesService: ClothesService, private _activatedRoute: ActivatedRoute) {
    this._activatedRoute.params.subscribe((params: Params) => {
      this._id = params.id;
    });
  
    this._clothesService.getOne(this._id).subscribe(clothesDB => {
      this.clothesRef = clothesDB;
    });
  }
  

}
