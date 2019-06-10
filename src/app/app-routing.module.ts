// import { NgModule } from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';

// const routes: Routes = [];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewtaskComponent } from './task/viewtask/viewtask.component';
import { AddtaskComponent } from './task/addtask/addtask.component';
import { AddprojectComponent } from './project/addproject/addproject.component';
import { AdduserComponent } from './user/adduser/adduser.component';

const routes: Routes = [
    {path: 'viewTask', component: ViewtaskComponent},
    {path: 'addTask',  component: AddtaskComponent},
    {path: 'addProject', component: AddprojectComponent},
    {path: 'addUser', component: AdduserComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'viewTask'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
