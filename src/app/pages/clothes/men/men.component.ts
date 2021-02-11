import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-men',
  templateUrl: './men.component.html',
  styleUrls: ['./men.component.css']
})
export class MenComponent implements OnInit {
  public menu: Array<any> = [];
  public show: string = 'block';
  constructor() {
    this.menu = ['Remeras', 'Camisas', 'Musculosas', 'Jeans', 'Shorts']; 
  }

  ngOnInit(): void {
  }

  showMenu() {
    return (this.show === 'none') ? this.show = 'block' : this.show = 'none';  
  }

}
