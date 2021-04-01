import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  public socialF:string = 'https://www.facebook.com/Fz-Indumentaria-110139507365445';
  public socialI:string = 'https://www.instagram.com/fz__indumentariaok/';
  public socialW:string = 'https://api.whatsapp.com/send?phone=+5493624569607"';
  public socialG:string = 'mailto:fzindumentariaarg@gmail.com';
  constructor() { }
}
