import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HelpersService } from './helpers.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Type } from '../interfaces/management-crud.interface';

@Injectable({
  providedIn: 'root'
})
export class TypesService {
  public url = `${environment.backend_url}/api`; 
  
  constructor(private _httpClient: HttpClient, private _helpersService: HelpersService) { }

  getTypes():Observable<any> {
    return this._httpClient.get(`${this.url}/types`)
      .pipe(
        map((res:{ok: boolean, types: any[]}) => {
          return res.types;
        })
      ); 
  }

  addType(newType: Type):Observable<any> {
    return this._httpClient.post(`${this.url}/types`, newType, {headers: this._helpersService.Headers})
      .pipe(
        map((res:any) => {
          return res.typeDB; 
        })
      );
  }

  updateType(typeToUpdate: Type):Observable<any> {
    const {type, _id}: Type = typeToUpdate; 
    return this._httpClient.put(`${this.url}/types/${_id}`, {type}, {headers: this._helpersService.Headers})
      .pipe(
        map((res:any) => {
          return res.typeUpdated; 
        })
      );
  }

  deleteType(id: string):Observable<any> {
    return this._httpClient.delete(`${this.url}/types/${id}`, {headers: this._helpersService.Headers}) 
      .pipe(
        map((res:any) => {
          return res.typeDeleted; 
        })
      );
  }
}
