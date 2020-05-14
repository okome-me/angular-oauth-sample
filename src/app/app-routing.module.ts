import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { CallbackComponent } from './component/callback/callback.component';
import { DisplayPhotoComponent } from './component/display-photo/display-photo.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'callback', component: CallbackComponent},
  {path: 'photo', component: DisplayPhotoComponent},
  {path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
