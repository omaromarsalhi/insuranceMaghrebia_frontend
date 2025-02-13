import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InsurancesComponent } from './insurance/insurances/insurances.component'


const routes: Routes = [
  { path: '', component: HomeComponent }, // Default route
  { path: 'insurances', component: InsurancesComponent }, // Navigate to 'About'
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
