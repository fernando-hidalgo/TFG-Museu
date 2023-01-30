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

@NgModule({
  declarations: [
    AppComponent,
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
