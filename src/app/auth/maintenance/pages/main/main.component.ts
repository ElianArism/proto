import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchEngineService } from 'src/app/services/search-engine.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public searchMode: boolean;
  
  constructor(private _searchEngineService: SearchEngineService) {}

  ngOnInit() {
    this._searchEngineService.getSearchMode()
      .subscribe((mode) => {
        this.searchMode = mode;
      })
  }
}