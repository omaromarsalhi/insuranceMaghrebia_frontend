import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {CamplaintComponent} from "./camplaint/camplaint.component";
import {ShowComplaintComponent} from "./show-complaint/show-complaint.component";
import {ResponseComplaintComponent} from "./response-complaint/response-complaint.component";

const routes: Routes = [
  { path: '', component: HomeComponent }, // Default route for the home page
  { path: 'home', component: HomeComponent },
  { path: 'camplaint', component: CamplaintComponent },
  { path: 'show', component: ShowComplaintComponent },
  { path: 'showResponse/:id', component:  ResponseComplaintComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
