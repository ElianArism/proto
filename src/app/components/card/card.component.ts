import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { data } from '../../interfaces/example-data';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  public exampleCard = data;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  redirectDetail() {
    this.router.navigateByUrl('home/clothes/detail/1');
  }

}
