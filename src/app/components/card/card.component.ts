import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import Clothes from 'src/app/interfaces/clothes.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() clothesId: string; 
  @Input() clothes: Clothes;
  constructor(private router: Router) {}

  redirectDetail() {
    this.router.navigateByUrl(`home/clothes/detail/${this.clothesId}`);
  }

}
