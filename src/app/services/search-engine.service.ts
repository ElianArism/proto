import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SearchEngineService {
  private _url: string = `${environment.backend_url}/api`; 
  public searchMode$ = new Subject<boolean>();
  public search$ = new Subject<any>();
 
  constructor(private _httpClient: HttpClient) {
    this.searchMode$.next(false);
  }

  search(search: string) {
    return this._httpClient.get(`${this._url}/search/${search}`)
      .pipe( 
        map( 
          (result: any) => {
            const {res} = result;
            let results = [];
            if(res.clothesDB.length > 0) {
              results = [...results, res.clothesDB];
            } 
            if(res.clothesAndTypesDB.length > 0) {
              results = [...results, res.clothesAndTypesDB];
            } 
            if(res.clothesAndBrandsDB.length > 0) {
              results = [...results, res.clothesAndBrandsDB];
            }
            this.search$.next(results);
          } 
        ), 
        tap(() => {
          this.searchMode$.next(true);
        })
      )
    }
  
  getResults(): Observable<any> {
    return this.search$.asObservable();
  }

  cancelSearch() {
    this.searchMode$.next(false);
  }

  getSearchMode(): Observable<boolean> {
    return this.searchMode$.asObservable();
  }
}