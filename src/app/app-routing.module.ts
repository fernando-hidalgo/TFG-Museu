import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VArtworkDetailsComponent } from './views/v-artwork-details/v-artwork-details.component';
import { VHomeSearchComponent } from './views/v-home-search/v-home-search.component';
import { VLoginSignupComponent } from './views/v-login-signup/v-login-signup.component';

const routes: Routes = [
  {path:'', component: VHomeSearchComponent},
  {path:'home', component: VHomeSearchComponent},
  {path:'search', component: VHomeSearchComponent},
  {path:'login', component: VLoginSignupComponent},
  {path:'details/:id', component: VArtworkDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
