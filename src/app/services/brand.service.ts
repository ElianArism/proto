import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Brand } from '../interfaces/management-crud.interface';
import { HelpersService } from './helpers.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  public url = `${environment.backend_url}/api`; 
  
  constructor(private _httpClient: HttpClient, private _helpersService: HelpersService) { }

  getBrands():Observable<any> {
    return this._httpClient.get(`${this.url}/brands`)
      .pipe(
        map((res:{ok: boolean, brands: any[]}) => {
          return res.brands;
        })
      ); 
  }

  addBrand(newBrand: Brand):Observable<any> {
    return this._httpClient.post(`${this.url}/brands`, newBrand, {headers: this._helpersService.Headers})
      .pipe(
        map((res:any) => {
          return res.brandDB; 
        })
      );
  }

  updateBrand(brandToUpdate: Brand):Observable<any> {
    const {name, _id}: Brand = brandToUpdate; 
    return this._httpClient.put(`${this.url}/brands/${_id}`, {name}, {headers: this._helpersService.Headers})
      .pipe(
        map((res:any) => {
          return res.brandUpdated; 
        })
      );
  }

  deleteBrand(id: string):Observable<any> {
    return this._httpClient.delete(`${this.url}/brands/${id}`, {headers: this._helpersService.Headers}) 
      .pipe(
        map((res:any) => {
          return res.brandDeleted; 
        })
      );
  }

}