import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HelpersService } from '../../services/helpers.service';
import { Subscription } from 'rxjs';
import { AdminService } from '../../services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnDestroy, OnInit {
  @Input() mode: boolean = false;
  @Input() AdminEmail: string = '';
  public activeSpinner: boolean = false;
  public loginForm;
  private _titleSub: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _helpersService: HelpersService,
    private _adminService: AdminService
    ) {
    this._titleSub = this._helpersService.getRouterData().subscribe(({title}) => document.title = title);
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [ this.AdminEmail, [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    this._adminService.login(this.loginForm.value)
      .subscribe((res: any) => {
        this.router.navigateByUrl('auth/maintenance');
      }, (err: any) => { Swal.fire('Ocurrio un error', `<p>${err.error.msg}</p>`, 'error'); console.log(err); });
  }

  ngOnDestroy(): void {
    this._titleSub.unsubscribe();
  }

  recoverPassword() {
    Swal.fire({
      title: 'Ingrese su correo electronico de administrador',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Listo',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading()
    })
    .then((result) => {
      if (result.isConfirmed) {
        if(this._helpersService.validateEmail(result.value)) {
          
          this.activeSpinner = true;
          this._adminService.recoverPassword(result.value).subscribe( (res:{ok: boolean, msg: string}) => {
            Swal.fire(res.msg, '', 'success');
            this.activeSpinner = false;
          }, (err) => {
            Swal.fire('No se encontro un administrador con ese correo', '', 'error');
          });

        } else {
          return Swal.fire('Ingrese un email valido', '', 'error');
        }
      }
    })

  }

  changePassword(e: Event) {
    e.preventDefault();
    console.log(this.loginForm.value)
    this._adminService.changePassword(this.loginForm.value).subscribe((res: {ok: boolean, msg: string}) => {
      Swal.fire(`Su contraseña fue actualizada`, '', 'success');
      this.router.navigateByUrl('/auth/login');
    }, (err) => {
      Swal.fire(`${err.error.msg}`, '', 'error');
    });
  }
}