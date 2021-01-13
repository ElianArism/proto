import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './auth/admin/admin.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { PagesRoutingModule } from './pages/pages-routing.module';

const routes: Routes = [
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
  {
    path: 'auth', component: AdminComponent
  },
  {
    path: '**', component: NotFoundComponent
  }
];

@NgModule({
  imports: [
    PagesRoutingModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
