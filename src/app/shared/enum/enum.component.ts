import { Component, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { ClothesService } from 'src/app/services/clothes.service';

@Component({
  selector: 'app-enum',
  templateUrl: './enum.component.html',
  styleUrls: ['./enum.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class EnumComponent implements OnInit {
  public pags: number; 
  public listLiEl: HTMLCollection; 
  @ViewChild('enumList') enumList;

  constructor(private _clothesService: ClothesService, private _rendered: Renderer2) { }

  ngOnInit(): void {
    this._clothesService.getClothes().subscribe(res => {
      this.pags = res.total;
      this.pags = this.getTotalPags();
      this.createPags();
    });
  }

  getTotalPags(): any {
      let total = Math.ceil((this.pags / 7));
      if(total < 0) total = 0;
      return total;
  }

  changeActive(el:Element) {
    for (let i = 0; i < this.listLiEl.length; i++) {
      if(el == this.listLiEl[i]) {
        this._rendered.addClass(this.listLiEl[i], 'active');
      } else {
        this._rendered.removeClass(this.listLiEl[i], 'active');
      }
    } 
  }

  createPags(): void {
    for (let i = 0; i < this.pags; i++) {
      const li = this._rendered.createElement('li');
      const text = this._rendered.createText(`${i+1}`); 
      this._rendered.setAttribute(li, 'data-value', `${i*7}`); 
      this._rendered.appendChild(li, text);
      this._rendered.appendChild(this.enumList.nativeElement, li);
      this._rendered.listen(li, 'click', (e) => this.selectPage(e));
    }
    this.listLiEl = this.enumList.nativeElement.children;
  }
  
  selectPage(e: any) {
    const el: Element = e.target;
    this.changeActive(el);
    const val = el.getAttribute('data-value');
    this._clothesService.setSince(Number(val));
  }
  
}