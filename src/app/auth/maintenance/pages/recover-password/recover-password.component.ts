import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {
  public email: string;
  
  constructor(private _activeRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this._activeRoute.params.subscribe(
      (params: Params) => {
        this.email = params.email;
      }
    )
  }



}
