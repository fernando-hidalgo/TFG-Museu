import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VArtworkDetailsComponent } from './views/v-artwork-details/v-artwork-details.component';
import { VHomeSearchComponent } from './views/v-home-search/v-home-search.component';
import { VListDetailsComponent } from './views/v-list-details/v-list-details.component';
import { VListEditorComponent } from './views/v-list-editor/v-list-editor.component';
import { VListsComponent } from './views/v-lists/v-lists.component';
import { VLoginSignupComponent } from './views/v-login-signup/v-login-signup.component';
import { VProfileComponent } from './views/v-profile/v-profile.component';

const routes: Routes = [
  {path:'', component: VHomeSearchComponent},
  {path:'search', component: VHomeSearchComponent},
  {path:'login', component: VLoginSignupComponent},
  {path:'artwork/:artworkId', component: VArtworkDetailsComponent},
  {path:'profile/:userId', component: VProfileComponent},
  {path:'profile/:userId/lists', component: VListsComponent},
  {path:'profile/:userId/lists/:listId', component: VListDetailsComponent},
  {path:'profile/:userId/lists/:listId/edit', component: VListEditorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
