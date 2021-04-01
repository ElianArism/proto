import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  public socialF:string = 'https://www.facebook.com/Fz-Indumentaria-110139507365445';
  public socialI:string = 'https://www.instagram.com/fz__indumentariaok/';
  public socialW:string = 'https://api.whatsapp.com/send?phone=+5493624569607"';
  public socialG:string = 'mailto:fzindumentariaarg@gmail.com';
  constructor() { }

}
