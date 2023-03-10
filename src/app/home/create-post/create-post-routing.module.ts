import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { CreatePostPage } from './create-post.page';

const routes: Routes = [
  {
    path: '',
    component: CreatePostPage
  },
  {
    path: '',
    loadComponent: () => import('../home.module').then( m => m.HomePageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatePostPageRoutingModule {}
