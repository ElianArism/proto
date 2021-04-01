import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ClothesService } from './clothes.service';
import { SearchEngineService } from './search-engine.service';

@Injectable({
  providedIn: 'root'
})
export class EnumService {
  private since$ = new Subject<number>(); 
  private currentPage$ = new Subject<number>(); 
  private since: number = 0; 
  private totalClothes: number = 0;
  private currentPage: number = 1;

  constructor(private _clothesService: ClothesService, private _searchEngine: SearchEngineService) {
    this._clothesService.TotalClothesObs
      .subscribe(total => {
        this.totalClothes = total;
      });
    
    this._searchEngine.TotalClothesObs
      .subscribe(total => {
        this.totalClothes = total;
      });
      
  }
    
  resetEnum() {
    this.since = 0; 
    this.currentPage = 1;
    this.currentPage$.next(this.currentPage);
  }

  get SinceObs() {
    return this.since$.asObservable(); 
  }
  get CurrentPageObs() {
    return this.currentPage$.asObservable(); 
  }
  set CurrentPage(newValue: number) {
    this.currentPage = newValue;
  }

  get Since() {
    return this.since;
  }

  set Since(newCurrent: number) {
    if (newCurrent === 0) {
      this.since = 0;
      this.since$.next(this.since);
      this.currentPage$.next(1);
    } else {
      this.since += newCurrent;
      (newCurrent > 0) ? this.nextPage() : this.previousPage()
    }
  }

  get TotalClothes() {
    return this.totalClothes
  }

  set TotalClothes(newTotal: number) {
    this.totalClothes = newTotal;
  }

  nextPage() {
    if(this.since >= this.totalClothes) {
      this.since = this.since - 7;
    } else this.currentPage ++;   
    this.since$.next(this.since);
    this.currentPage$.next(this.currentPage);
  }
  
  previousPage() {    
    if(this.since <= 0) this.since = 0;
    if(this.currentPage <= 1) this.currentPage = 1; 
    else this.currentPage --;
    this.since$.next(this.since);
    this.currentPage$.next(this.currentPage);
  }

}
