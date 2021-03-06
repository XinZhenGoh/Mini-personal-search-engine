import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminTabComponent} from './tab/admin-tab/admin-tab.component';
import {TabComponent} from './tab/tab/tab.component';
import {IeltsComponent} from './tab/ielts-tab/ielts.component';


const routes: Routes = [
  {path: '', component: TabComponent},
  {path: 'admin', component: AdminTabComponent},
  {path: 'ielts', component: IeltsComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
