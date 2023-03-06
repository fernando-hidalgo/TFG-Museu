import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CNavbarComponent } from './components/c-navbar/c-navbar.component';
import { CArtworkCardComponent } from './components/c-artwork-card/c-artwork-card.component';
import { CCredentialsBoxComponent } from './components/c-credentials-box/c-credentials-box.component';
import { CMuseuButtonComponent } from './components/c-museu-button/c-museu-button.component';
import { CSignupBoxComponent } from './components/c-signup-box/c-signup-box.component';
import { CReviewCardComponent } from './components/c-review-card/c-review-card.component';
import { CListCardComponent } from './components/c-list-card/c-list-card.component';
import { CSearchFilterComponent } from './components/c-search-filter/c-search-filter.component';
import { CProfileFilterComponent } from './components/c-profile-filter/c-profile-filter.component';
import { COrderFilterComponent } from './components/c-order-filter/c-order-filter.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { CRatingStarsComponent } from './components/c-rating-stars/c-rating-stars.component';
import { VArtworkDetailsComponent } from './views/v-artwork-details/v-artwork-details.component';
import { VLoginSignupComponent } from './views/v-login-signup/v-login-signup.component';
import { VHomeSearchComponent } from './views/v-home-search/v-home-search.component';
import { VProfileComponent } from './views/v-profile/v-profile.component';
import { VListsComponent } from './views/v-lists/v-lists.component';
import { VListDetailsComponent } from './views/v-list-details/v-list-details.component';
import { VListEditorComponent } from './views/v-list-editor/v-list-editor.component';
import { CFooterComponent } from './components/c-footer/c-footer.component';
import { CDialogComponent } from './components/c-dialog/c-dialog.component';

@NgModule({
  declarations: [
    AppComponent,

    //COMPONENTS
    CNavbarComponent,
    CArtworkCardComponent,
    CCredentialsBoxComponent,
    CMuseuButtonComponent,
    CSignupBoxComponent,
    CReviewCardComponent,
    CListCardComponent,
    CSearchFilterComponent,
    CProfileFilterComponent,
    COrderFilterComponent,
    CRatingStarsComponent,
    CFooterComponent,
    CDialogComponent,

    //VIEWS
    VArtworkDetailsComponent,
    VLoginSignupComponent,
    VHomeSearchComponent,
    VProfileComponent,
    VListsComponent,
    VListDetailsComponent,
    VListEditorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NoopAnimationsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
