import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public menu: Array<any> = [];

  constructor() {
    this.menu = ['Remeras', 'Camisas', 'Tops', 'Jeans', 'Vestidos', 'Shorts']
  }

  ngOnInit(): void {
  }

}
