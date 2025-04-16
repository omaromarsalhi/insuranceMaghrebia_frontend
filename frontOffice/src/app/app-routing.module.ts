import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {CamplaintComponent} from "./complaints/camplaint/camplaint.component";
import {ShowComplaintComponent} from "./complaints/show-complaint/show-complaint.component";
import {ResponseComplaintComponent} from "./complaints/response-complaint/response-complaint.component";
import {PopupComponent} from "./complaints/popup/popup.component";

const routes: Routes = [
  { path: '', component: HomeComponent }, // Default route for the home page
  { path: 'home', component: HomeComponent },
  // { path: 'camplaint', component: CamplaintComponent },
  // { path: 'show', component: ShowComplaintComponent },
  // { path: 'showResponse/:id', component:  ResponseComplaintComponent },
  // { path: 'test', component:  PopupComponent },
  {path: 'complaints', loadChildren: () => import('./complaints/complaints-module').then(m => m.ComplaintsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
