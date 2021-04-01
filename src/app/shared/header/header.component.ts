import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { EnumService } from 'src/app/services/enum.service';
import { SearchEngineService } from 'src/app/services/search-engine.service';
import Swal from 'sweetalert2';
import { HelpersService } from '../../services/helpers.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy, OnInit {
  @ViewChild('iSearch') input: ElementRef;
  public showSearchEngine: boolean = false;
  private titleSub: Subscription;
  _search: boolean = false;
  constructor(
    private _helpersService: HelpersService,
    private _enumService: EnumService,
    private _searchEngine: SearchEngineService
  ) {
    
    this.titleSub = this._helpersService.getRouterData()
      .subscribe( ({title}) => {
        if(title === 'Ropa - Hombre') this.showSearchEngine = true;
        else if(title === 'Ropa - Mujer') this.showSearchEngine = true;
        else this.showSearchEngine = false;
        document.title = `Fz - ${title}`;
      });
  }

  ngOnInit() {
    this._searchEngine.getSearchMode()
      .subscribe(search => this._search = search)
  }
  
  ngOnDestroy(): void {
    this.titleSub.unsubscribe();
  }

  search(e, search: string) {
    e.preventDefault();
    this._search = true; 
    this._enumService.resetEnum();
    this._searchEngine.search4Sex(search)
      .subscribe(() => {
        this.input.nativeElement.value = '';
      }, err => {
        Swal.fire('Woops!', `<p>No se encontraron prendas que correspondan con esas opciones</p>`, 'info');
        this.input.nativeElement.value = '';
        return this._searchEngine.cancelSearch();
      });
  }

  cancelSearch() {
    this._search = false; 
    this._searchEngine.cancelSearch();
  }
}
