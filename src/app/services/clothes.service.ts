import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelpersService } from './helpers.service';
import { environment } from 'src/environments/environment';
import Clothes from '../interfaces/clothes.interface';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ClothesService {
  private url = `${environment.backend_url}/api/clothes`;
  private totalClothes$ = new Subject<number>();

  constructor(private _httpClient: HttpClient, private _helpersService: HelpersService) {} 

  addClothes(newClothes: Clothes):Observable<any> {
    return this._httpClient.post(this.url, newClothes, {headers: this._helpersService.Headers})
      .pipe(
        map((res:any) => {
          return res.clothesBD; 
        }));
  }

  get TotalClothesObs() {
    return this.totalClothes$.asObservable();
  }
      
  getClothes(since:number = 0):Observable<any> {
   return this._httpClient.get(`${this.url}?since=${since}`)
    .pipe(
      map((res: any) => { 
        res.clothes = res.clothes.map(clothes => {
          let {gender} = clothes;
          if(gender.length === 1)  {
            gender = (gender[0] === 'man') ? 'Hombre' : 'Mujer' 
          }
          clothes.gender = gender; 
          return clothes;
        });
        
        this.totalClothes$.next(res.total);
        return res; 
      })
      ); 
    }
    
  getClothes4Sex(sex: string, since: number = 0) {
    return this._httpClient.get(`${this.url}/${sex}?since=${since}`)
    .pipe(
      map((res: any) => {

        if(res.clothesDB.length > 0) {
          res.clothesDB = res.clothesDB.map(clothes => {
            let {gender} = clothes;
            if(gender.length === 1)  {
              gender = (gender[0] === 'man') ? 'Hombre' : 'Mujer' 
            }
            clothes.gender = gender; 
            return clothes;
          });
          this.totalClothes$.next(res.total);
          return {clothes: res.clothesDB, total: res.total}; 
        } else {
          return [];
        }
      }) 
    );
  }
      
  getOne(id: string):Observable<any> {
    return this._httpClient.get(`${this.url}/one/${id}`)
      .pipe(
          map((res:any) => {
            return res.clothesDB
          })
      ); 
  }
        
  updateClothes(id: string, data: {}):Observable<any> {
    return this._httpClient.put(`${this.url}/${id}`, data, {headers: this._helpersService.Headers})
      .pipe(
        map((res:any) => res.clothesUpdate)
      ); 
  }

  setStock(id: string, stock: number, size: string):Observable<any> {
    return this._httpClient.put(`${this.url}/setstock/${id}`, {stock, size})
      .pipe(
        map((res: any) => {
          return res.updateClothesDB;
        })
      )
  }

  activateOrdeactivateClothes(id: string, activate: boolean):Observable<any> {
    return this._httpClient.put(`${this.url}/activate-clothes/${id}`, {activate} ,{headers: this._helpersService.Headers})
    .pipe(
      map((res:any) => res.clothesDeleted)
    );
  }

  deleteClothes(id: string):Observable<any> {
    return this._httpClient.delete(`${this.url}/${id}`, {headers: this._helpersService.Headers})
    .pipe(
      map((res:any) => res.clothesDeleted)
    );
  }
}