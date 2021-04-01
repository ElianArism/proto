import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SearchEngineService {
  private _url: string = `${environment.backend_url}/api`;
  private _searchMode$ = new Subject<boolean>();
  private _totalClothes$ = new Subject<number>();
  private _sexLooking: string;
  private _searchResults$ = new Subject<any>();

  constructor(private _httpClient: HttpClient) {}

  setSearchMode(value:boolean) {
    this._searchMode$.next(value);
  }
  set Sex(newValue) {
    this._sexLooking = newValue; 
  }

  get Sex() {
    return this._sexLooking;
  }

  get TotalClothesObs() {
    return this._totalClothes$.asObservable();
  } 

  get SearchResultsObs() {
    return this._searchResults$.asObservable();
  }

  search4Sex(search: string, since: number = 0) {
    this._searchMode$.next(true);
    return this._httpClient.get(`${this._url}/search-sex/${search}?sex=${this._sexLooking}&since=${since}`).pipe(
      
      map((result: any) => {
        const {res} = result;
        this._totalClothes$.next(res.total);
        let results = [];

        if (res.clothesDB.length > 0) {
          res.clothesDB.map(item => {
            results = [...results, item];
          });
        }
        if (res.clothesAndTypesDB.length > 0) {
          res.clothesAndTypesDB.map(item => {
            results = [...results, item];
          });
        }
        if (res.clothesAndBrandsDB.length > 0) {
          res.clothesAndBrandsDB.map(item => {
            results = [...results, item];
          });
        }
        return results;
      }),
      map((results: any) => {
        if (results.length > 0) {
          results = results.map((clothes) => {
            let { gender } = clothes;
            if (gender.length === 1) {
              gender = gender[0] === 'man' ? 'Hombre' : 'Mujer';
            }
            clothes.gender = gender;
            return clothes;
          });
          this._searchResults$.next({search, mode: 'search', results});
        }
      }),
    )
  }

  search(search: string) {
    return this._httpClient.get(`${this._url}/search/${search}`).pipe(
      map((result: any) => {
        const { res } = result;
        let results = [];
        if (res.clothesDB.length > 0) {
          results = [...results, res.clothesDB];
        }
        if (res.clothesAndTypesDB.length > 0) {
          results = [...results, res.clothesAndTypesDB];
        }
        if (res.clothesAndBrandsDB.length > 0) {
          results = [...results, res.clothesAndBrandsDB];
        }
        return results;
      }),
      map((arrayWithResults: any) => {
        let [arrayResults] = arrayWithResults;
        if (arrayResults.length > 0) {
          arrayResults = arrayResults.map((clothes) => {
            let { gender } = clothes;
            if (gender.length === 1) {
              gender = gender[0] === 'man' ? 'Hombre' : 'Mujer';
            }
            clothes.gender = gender;
            return clothes;
          });
          this._totalClothes$.next(arrayResults);
          this._searchResults$.next(arrayResults);
          return arrayResults;
        }
      }),
      tap(() => {
        this._searchMode$.next(true);
      })
    );
  }

  cancelSearch() {    
    this._searchMode$.next(false);
  }

  getSearchMode(): Observable<boolean> {
    return this._searchMode$.asObservable();
  }

  filter({ Fbrand, Ftype }): Observable<any> {
    let url;

    if (!Fbrand) {
      url = `${this._url}/search?types=${Ftype}`;
    } else if (!Ftype) {
      url = `${this._url}/search?brands=${Fbrand}`;
    } else {
      url = `${this._url}/search?brands=${Fbrand}&types=${Ftype}`;
    }

    return this._httpClient.get(url).pipe(
      map((resp: any) => {
        let {res} = resp;
        if (res.length > 0) {
          res = res.map((clothes) => {
            let { gender } = clothes;
            if (gender.length === 1) {
              gender = gender[0] === 'man' ? 'Hombre' : 'Mujer';
            }
            clothes.gender = gender;
            return clothes;
          });
          this._totalClothes$.next(res.totalClothes);
          return res;
        }
      }),
      tap(() => {
        this._searchMode$.next(true);
      })
    );
  }

  filter4Sex({ Fbrand, Ftype }, sex = 'both', since = 0): Observable<any> {
    let url;

    if (!Fbrand) {
      url = `${this._url}/filter-sex/${sex}?types=${Ftype}&since=${since}`;
    } else if (!Ftype) {
      url = `${this._url}/filter-sex/${sex}?brands=${Fbrand}&since=${since}`;
    } else {
      url = `${this._url}/filter-sex/${sex}?brands=${Fbrand}&types=${Ftype}&since=${since}`;
    }

    return this._httpClient.get(url).pipe(
      map((res: any) => {
        if (res.clothesDB.length > 0) {
          res.clothesDB = res.clothesDB.map((clothes) => {
            let { gender } = clothes;
            if (gender.length === 1) {
              gender = gender[0] === 'man' ? 'Hombre' : 'Mujer';
            }
            clothes.gender = gender;
            return clothes;
          });
          this._totalClothes$.next(res.totalClothes);
          return res.clothesDB;
        }
      })
    );
  }
}
