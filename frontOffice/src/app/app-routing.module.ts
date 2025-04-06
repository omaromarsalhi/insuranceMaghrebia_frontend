import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TestComponent } from './insurances/test/test.component';


const routes: Routes = [
  { path: 'insurance', loadChildren: () => import('./insurances/insurance-routing.module').then(m => m.InsuranceRoutingModule) },
  { path: 'home', component: HomeComponent }, 
  { path: '', component: HomeComponent }, 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }