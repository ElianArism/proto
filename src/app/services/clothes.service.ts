import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelpersService } from './helpers.service';
import { environment } from 'src/environments/environment';
import Clothes from '../interfaces/clothes.interface';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClothesService {
  private url = `${environment.backend_url}/api/clothes`
  constructor(private _httpClient: HttpClient, private _helpersService: HelpersService) {} 

  addClothes(newClothes: Clothes):Observable<any> {
    return this._httpClient.post(this.url, newClothes, {headers: this._helpersService.Headers})
      .pipe(
        map((res:any) => {
          return res.clothesBD; 
        })
      );
  }
}
