import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SearchEngineService } from 'src/app/services/search-engine.service';

@Component({
  selector: 'app-search-engine',
  templateUrl: './search-engine.component.html',
  styleUrls: ['./search-engine.component.css']
})
export class SearchEngineComponent implements OnInit {
  public searchMode: boolean;
  constructor(private _searchEngineService: SearchEngineService) {}

  ngOnInit(): void {
    this._searchEngineService.getSearchMode().subscribe(mode => {
      this.searchMode = mode; 
    });
  }

  searchEngine(search: string) {
    this._searchEngineService.search(search)
      .subscribe();
  }

  cancelSearch() {
    this._searchEngineService.cancelSearch();
  }
}