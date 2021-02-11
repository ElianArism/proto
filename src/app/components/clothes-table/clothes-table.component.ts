import { Component, OnInit } from '@angular/core';
import Clothes from 'src/app/interfaces/clothes.interface';
import { data } from '../../interfaces/example-data';

@Component({
  selector: 'app-clothes-table',
  templateUrl: './clothes-table.component.html',
  styleUrls: ['./clothes-table.component.css']
})

export class ClothesTableComponent implements OnInit {
  public data: Array<Clothes> = [
    data,
    data,
    data
  ]

  constructor() { }

  ngOnInit(): void {}

}