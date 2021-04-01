import { Component, OnInit } from '@angular/core';
import { EnumService } from 'src/app/services/enum.service';

@Component({
  selector: 'app-enum',
  templateUrl: './enum.component.html',
  styleUrls: ['./enum.component.css'],
})

export class EnumComponent implements OnInit {
  public currentPage = 1; 

  constructor(private _enumService: EnumService) {}
  
  ngOnInit(): void {
    this._enumService.CurrentPageObs
      .subscribe(newCurrent => {
        this.currentPage = newCurrent;
      })
  }
  
  previousPage(newSince) {
    this._enumService.Since = newSince;
  }
  
  nextPage(newSince) {
    this._enumService.Since = newSince;
  }

}