import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-woman',
  templateUrl: './woman.component.html',
  styleUrls: ['./woman.component.css']
})
export class WomanComponent implements OnInit {
  public menu: Array<any> = []; 
  public show: string = 'block';
  
  constructor() {
    this.menu = ['Remeras', 'Camisas', 'Tops', 'Jeans', 'Vestidos', 'Shorts'];
  }

  ngOnInit(): void {
  }
}
