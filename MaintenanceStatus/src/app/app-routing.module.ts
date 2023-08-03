import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { EditComponent } from './Components/edit/edit.component';
import { MainComponent } from './Components/main/main.component';
import { Edit2Component } from './Components/edit2/edit2.component';

const routes: Routes = [
  { path: '', component: MainComponent,  canActivate: [AuthGuard] },
  { path: 'edit', component: EditComponent, canActivate: [AuthGuard] },
  { path: 'edit2', component: Edit2Component, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
