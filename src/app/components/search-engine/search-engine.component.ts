import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SearchEngineService } from 'src/app/services/search-engine.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search-engine',
  templateUrl: './search-engine.component.html',
  styleUrls: ['./search-engine.component.css']
})
export class SearchEngineComponent implements OnInit {
  public searchMode: boolean = false;
  @ViewChild('inputSearch') input: ElementRef;
  constructor(private _searchEngineService: SearchEngineService) {}

  ngOnInit(): void {}

  searchEngine(search: string) {
    this._searchEngineService.search(search).subscribe(() => {
      this._searchEngineService.setSearchMode(true);
      this.searchMode = true;
    }, err => {
      this.input.nativeElement.value = '';
      Swal.fire('Woops!', `<p>No se encontraron prendas que correspondan con esas opciones</p>`, 'info');
    });
  }

  cancelSearch() {
    this._searchEngineService.cancelSearch();
    this.searchMode = false;
    this.input.nativeElement.value = '';
  }
}