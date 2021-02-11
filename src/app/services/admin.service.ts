import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AdminUser } from '../interfaces/admin';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HelpersService } from './helpers.service';

@Injectable({
  providedIn: 'root'
})

export class AdminService { 

  constructor(private _httpClient: HttpClient, private _helpersService: HelpersService) {}

  updateLS(token: string) {
    localStorage.setItem('x-token', token);
  }

  login(admin: {email: string, password: string}):Observable<any> {
    const url = `${environment.backend_url}/api/auth/login`; 
    return this._httpClient.post(url, admin)
      .pipe(
        tap((res: any) => {
          this.updateLS(res.token);   
        })
       ); 
  }

  recoverPassword(email: string):Observable<any> {
    const url:string = `${environment.backend_url}/api/auth/recover-password`;
    return this._httpClient.post(url, {'email':email});
  }

  changePassword(body: {email: string, password: string}):Observable<any> {
    const url:string = `${environment.backend_url}/api/auth/recover-password?changePass=true`;
    return this._httpClient.put(url, body);
  }

  updateAdmin(admin: AdminUser):Observable<any> {
    const url:string = `${environment.backend_url}/api/auth?changePass=false`;
    return this._httpClient.put(url, admin, {headers: this._helpersService.Headers})
      .pipe(
        map((res:any) => res.adminUpdated)
      );
  }

  addAdmin(newAdmin: AdminUser):Observable<any> {
    const url:string = `${environment.backend_url}/api/auth/register`; 
    return this._httpClient.post(url, newAdmin);
  }

  getAdmins():Observable<any> {
    const url:string = `${environment.backend_url}/api/auth`;
    return this._httpClient.get(url, {'headers': this._helpersService.Headers})
      .pipe(
        map((res: {ok: boolean, admins: AdminUser[]}) => (res.ok) ? ((res.admins.length > 0) ?  res.admins : false ) : false)
      );
  }

  activateOrDeactivateAdmin(id: string):Observable<any> {
    const url:string = `${environment.backend_url}/api/auth/${id}`; 
    return this._httpClient.put(url, {}, {headers: this._helpersService.Headers});
  }

  deleteAdmins(id: string):Observable<any> {
    const url:string =  `${environment.backend_url}/api/auth/${id}`;
    return this._httpClient.delete(url, {headers: this._helpersService.Headers}); 
  }

  validateJWT():Observable<any> {    
    const url = `${environment.backend_url}/api/auth/renew-token`;
    return this._httpClient.get(url, {'headers': this._helpersService.Headers});
  }

  logout(): void {
    localStorage.removeItem('x-token'); 
  }
}