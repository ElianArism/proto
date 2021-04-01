import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../../../services/admin.service';
import Swal from 'sweetalert2';
import { AdminUser } from '../../../../interfaces/admin';

@Component({
  selector: 'app-config-zone-admin',
  templateUrl: './config-zone-admin.component.html',
  styleUrls: ['./config-zone-admin.component.css']
})  

export class ConfigZoneAdminComponent implements OnInit{
  public adminToUpdate: {email: string, password: string, _id: string} = {email: '', password: '',  _id: ''};  
  public editMode: boolean = false; 
  public admins: AdminUser[] | boolean; 
  public type: string = 'password';
  public adminForm = this._fb.group({
    email: [this.adminToUpdate.email, [Validators.required, Validators.email]],    
    password: [this.adminToUpdate.password, [Validators.required]]    
  }); 
  
  constructor(private _fb: FormBuilder, private _adminService: AdminService) { }
  
  ngOnInit() {
    this.getAdmins();
  }

  seePassword(): void {
    if(this.type === 'password') {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }

  addNewAdmin(): any {
    this._adminService.addAdmin(this.adminForm.value)
      .subscribe((res: {ok: boolean, user?: AdminUser, err?: string}) => {
        const {ok} = res;
        if(!ok) {
          return Swal.fire(`Ocurrio un error: ${res.err}`, '', 'error'); 
        } else {
          this.getAdmins(); 
          return Swal.fire(`Se agrego el administrador`,`<p>Correo: ${res.user.email}</p>`, 'success');
        }
      }, (err: any) => {
        return Swal.fire(`Ocurrio un error:`, `<p>${err.error.msg}</p>`, 'error');    
      });    
  }

  editAdmin(admin: AdminUser): void {
    this.adminToUpdate = admin; 
    this.editMode = true; 
    this.adminForm.setValue({email: this.adminToUpdate.email, password: ''}) 
    this.adminForm.controls['password'].disable(); 
  }

  updateAdmin() {
    this.adminToUpdate.email = this.adminForm.get('email').value;  
    this._adminService.updateAdmin(this.adminToUpdate)
    .subscribe((adminUpdated: AdminUser) => {
      Swal.fire('Administrador actualizado!', `<p>Correo: ${adminUpdated.email}</p>`, 'success');
      this.getAdmins();
      this.adminToUpdate = {password: '', email: '', _id: ''};
      this.adminForm.setValue({password: this.adminToUpdate.password, email: this.adminToUpdate.email}); 
    });
  }

  getAdmins(): void {
    this._adminService.getAdmins().subscribe((res: AdminUser[] | boolean) => {
      this.admins = (!res) ? [] : res; 
    }, (err:any) => {
      console.log(err); 
      this.admins = [];
    });
  }

  deleteOrDeactivateAdmin(admin: AdminUser): void {
    Swal.fire({
      title: 'Desea deshabilitar o eliminar completamente al usuario?',
      showDenyButton: true,
      denyButtonText: 'Eliminar', 
      confirmButtonText: 'Deshabilitar',
      allowOutsideClick: () => !Swal.isLoading()
    }).then((res: any) => {
      if(res.isConfirmed) {
        this._adminService.activateOrDeactivateAdmin(admin._id)
          .subscribe(res => {
            Swal.fire('Se deshabilito al administrador', `<p>Correo: ${res.adminUpdated.email}</p>`, 'success');
            this.getAdmins();
          }, (err: any) => {
            console.log(err);
            Swal.fire('Ocurrio un error', '', 'error');
          });
      } else if (res.isDenied) {
        this._adminService.deleteAdmins(admin._id)
          .subscribe(res => {
            Swal.fire('Se elimino al administrador', `<p>Correo: ${res.adminDeleted.email}</p>`, 'success');
            this.getAdmins();
          }, (err: any) => {
            console.log(err);
            Swal.fire('Ocurrio un error', '', 'error');
          });
      }
    }).catch((err:any) => {
      console.log(err);
      Swal.fire('Ocurrio un error inesperado', '', 'error');
    });
  }

  activateAdmin(admin: AdminUser): void {
    Swal.fire({
      title: 'Desea habilitar a este administrador?', 
      showCancelButton: true, 
      showConfirmButton: true, 
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar'
    }).then(res => {
      if(res.isConfirmed) {
        this._adminService.activateOrDeactivateAdmin(admin._id)
          .subscribe((res:any) => {
            Swal.fire('Se ha habilitado a este administrador', `<p>Correo: ${res.adminUpdated.email}</p>`, 'success');  
            this.getAdmins();
          }, (err: any) => {
            console.log(err);
            Swal.fire('Ocurrio un error', '', 'error');
          });
      }
    }).catch(err => {
      console.log(err); 
      Swal.fire('Ocurrio un error', '', 'error');
    });
  }
}