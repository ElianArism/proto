import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Clothes from 'src/app/interfaces/clothes.interface';
import { ClothesService } from '../../services/clothes.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { SearchEngineService } from 'src/app/services/search-engine.service';

@Component({
  selector: 'app-clothes-table',
  templateUrl: './clothes-table.component.html',
  styleUrls: ['./clothes-table.component.css']
})

export class ClothesTableComponent implements OnInit {
  public clothesDB: Array<Clothes> = [];
  private searchMode; 
  private since$: Observable<number>;
  private since: number = 0;
  private searchObs$: Observable<any>;
  constructor(private _clothesService: ClothesService, private _router: Router, private _searchEngineService: SearchEngineService) { }

  ngOnInit(): void {
    // since
    this.since$ = this._clothesService.getSince();
    this.getClothes();
    this.since$.subscribe(newSince => {
      this.since = newSince;
      this.getClothes();      
    });

    // search
    this.searchObs$ = this._searchEngineService.getResults();
    this.searchObs$.subscribe((searchResults: any) => {   
      if(searchResults.length > 0) this.clothesDB = searchResults[0];
    }); 

    // cancel search
    this._searchEngineService.getSearchMode().subscribe(mode => {
      this.searchMode = mode; 
      if(!this.searchMode) this.getClothes();
    });
  }

  getClothes() {
    this._clothesService.getClothes(this.since).subscribe(res => {
      this.clothesDB = res.clothes;
    });
  }

  updateClothes(clothesRef): void {
    this._router.navigateByUrl(`/auth/maintenance/update-clothes/${clothesRef._id}`)
  }

  deleteClothes(clothesRef): void {
    const {_id, active} = clothesRef;
    console.log(active);
    Swal.fire({
      title: 'Eliminar prenda',
      html: `<p>Desea eliminar completamente o desactivar esta prenda?</p>`,
      showDenyButton: true,
      denyButtonText: 'Eliminar', 
      confirmButtonText: 'Desactivar',
      denyButtonColor: 'red',
      icon: 'warning'
    })
    .then((res) => {
      if(res.isConfirmed) {
        this._clothesService.activateOrdeactivateClothes(_id, active)
          .subscribe((clothes:Clothes) => {
            Swal.fire(`Se ha desactivado la prenda`, `<p>${clothes.name}</p>`, 'success');
            this.getClothes();
          }, error => {
            Swal.fire('Error', `<p>${error}</p>`, 'error');
          });
      } else if (res.isDenied) {
        this._clothesService.deleteClothes(_id)
          .subscribe((clothes:Clothes) => {
            console.log(clothes.active);
            Swal.fire(`Se ha eliminado la prenda`, `<p>${clothes.name}</p>`, 'success');
            this.getClothes();
          }, error => {
            console.log(error);
            Swal.fire('Error', `<p>${error}</p>`, 'error');
          });
      }
    }).catch(err => {
      console.log(err);
      Swal.fire({
        title: 'error', 
        text: `<p>Error, ${err}</p>`,
        icon:'error'
      });
    });
  }
}