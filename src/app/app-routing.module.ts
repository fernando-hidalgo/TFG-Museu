import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VArtworkDetailsComponent } from './views/v-artwork-details/v-artwork-details.component';
import { VHomeSearchComponent } from './views/v-home-search/v-home-search.component';
import { VListDetailsComponent } from './views/v-list-details/v-list-details.component';
import { VListEditorComponent } from './views/v-list-editor/v-list-editor.component';
import { VListsComponent } from './views/v-lists/v-lists.component';
import { VLoginSignupComponent } from './views/v-login-signup/v-login-signup.component';
import { VProfileComponent } from './views/v-profile/v-profile.component';
import { LoginGuard } from './guards/login.guard';
import { ProfileGuard } from './guards/profile.guard';
import { ListGuard } from './guards/list.guard';
import { ListEditGuard } from './guards/list-edit.guard';

const routes: Routes = [
  {path:'', component: VHomeSearchComponent},
  {path:'search', component: VHomeSearchComponent},
  {path:'login', component: VLoginSignupComponent, canActivate: [LoginGuard]},
  {path:'artwork/:artworkId', component: VArtworkDetailsComponent},
  {path:'profile/:userId', component: VProfileComponent, canActivate: [ProfileGuard]},
  {path:'profile/:userId/lists', component: VListsComponent, canActivate: [ProfileGuard]},
  {path:'profile/:userId/lists/:artlistId', component: VListDetailsComponent, canActivate: [ProfileGuard, ListGuard]},
  {path:'profile/:userId/lists/:artlistId/edit', component: VListEditorComponent, canActivate: [ProfileGuard, ListGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
