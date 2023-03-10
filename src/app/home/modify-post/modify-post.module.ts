import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifyPostPageRoutingModule } from './modify-post-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModifyPostPage } from './modify-post.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifyPostPageRoutingModule,
    SharedModule
  ],
  declarations: [ModifyPostPage]
})
export class ModifyPostPageModule {}
