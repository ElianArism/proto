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
  private url = `${environment.backend_url}/api/clothes`
  private since$ = new Subject<number>(); 
  private since: number = 0;
  private countClothes: number = 0;
  
  constructor(private _httpClient: HttpClient, private _helpersService: HelpersService) {
    this.getClothes(0).subscribe((res:any) => this.countClothes = Number(res.total))
  } 

  addClothes(newClothes: Clothes):Observable<any> {
    return this._httpClient.post(this.url, newClothes, {headers: this._helpersService.Headers})
      .pipe(
        map((res:any) => {
          return res.clothesBD; 
        })
      );
  }

  getClothes(since:number = 0):Observable<any> {
   return this._httpClient.get(`${this.url}?since=${since}`)
    .pipe(
      map((res: any) => { 
        res.clothes = res.clothes.map(clothes => {
          let {gender} = clothes;
          if(gender.length === 1)  {
            gender = (gender[0] === 'Hombre') ? 'Hombre' : 'Mujer' 
          } else {
            gender = 'Hombre/Mujer'
          }
          clothes.gender = gender; 
          return clothes;
        });
        return res; 
      })
    ); 
  }

  getOne(id: string):Observable<any> {
    return this._httpClient.get(`${this.url}/${id}`)
      .pipe(
        map((res:any) => res.clothesDB)
      ); 
  }

  updateClothes(id: string, data: {}):Observable<any> {
    return this._httpClient.put(`${this.url}/${id}`, data, {headers: this._helpersService.Headers})
    .pipe(
      map((res:any) => res.clothesUpdate)
    ); 
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

  setSince(number: number) {
    if (number === 0) this.since = 0;
    else if (this.since < number) this.since += number; 
    else if (this.since > number) this.since -= number;

    if(this.since < 0 ) this.since = 0;
    else if(this.since > this.countClothes) this.since = number;
    
    this.since$.next(this.since);
  }

  getSince(): Observable<number> {
    return this.since$.asObservable();
  }
}