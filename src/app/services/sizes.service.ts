import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Sizes } from '../interfaces/management-crud.interface';
import { HelpersService } from './helpers.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SizesService {
  public url = `${environment.backend_url}/api`; 
  
  constructor(private _httpClient: HttpClient, private _helpersService: HelpersService) { }

  getSizes():Observable<any> {
    return this._httpClient.get(`${this.url}/sizes`)
      .pipe(
        map((res:{ok: boolean, sizes: any[]}) => {
         return res.sizes;
        })
      ); 
  }

  addSize(newSize: Sizes):Observable<any> {
    return this._httpClient.post(`${this.url}/sizes`, newSize, {headers: this._helpersService.Headers})
      .pipe(
        map((res:any) => {
          return res.sizeBD; 
        })
      );
  }

  updateSize(sizeToUpdate: Sizes):Observable<any> {
    const {size, _id}: Sizes = sizeToUpdate; 
    return this._httpClient.put(`${this.url}/sizes/${_id}`, {size}, {headers: this._helpersService.Headers})
      .pipe(
        map((res:any) => {
          return res.sizeUpdated; 
        })
      );
  }

  deleteSize(id: string):Observable<any> {
    return this._httpClient.delete(`${this.url}/sizes/${id}`, {headers: this._helpersService.Headers}) 
      .pipe(
        map((res:any) => {
          return res.sizeDeleted; 
        })
      );
  }

}