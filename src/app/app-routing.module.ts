import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VArtworkDetailsComponent } from './views/v-artwork-details/v-artwork-details.component';
import { VHomeSearchComponent } from './views/v-home-search/v-home-search.component';
import { VListDetailsComponent } from './views/v-list-details/v-list-details.component';
import { VListsComponent } from './views/v-lists/v-lists.component';
import { VLoginSignupComponent } from './views/v-login-signup/v-login-signup.component';
import { VProfileComponent } from './views/v-profile/v-profile.component';

const routes: Routes = [
  {path:'', component: VHomeSearchComponent},
  {path:'home', component: VHomeSearchComponent},
  {path:'search', component: VHomeSearchComponent},
  {path:'login', component: VLoginSignupComponent},
  {path:'details/:id', component: VArtworkDetailsComponent},
  {path:'profile/:id', component: VProfileComponent},
  {path:'profile/:id/lists', component: VListsComponent},
  {path:'profile/:id/lists/:listId', component: VListDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
