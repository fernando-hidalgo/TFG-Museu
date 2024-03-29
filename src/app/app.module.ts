import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CNavbarComponent } from './components/c-navbar/c-navbar.component';
import { CArtworkCardComponent } from './components/c-artwork-card/c-artwork-card.component';
import { CCredentialsBoxComponent } from './components/c-credentials-box/c-credentials-box.component';
import { CMuseuButtonComponent } from './components/c-museu-button/c-museu-button.component';
import { CSignupBoxComponent } from './components/c-signup-box/c-signup-box.component';
import { CReviewCardComponent } from './components/c-review-card/c-review-card.component';
import { CListCardComponent } from './components/c-list-card/c-list-card.component';
import { CSearchFilterComponent } from './components/c-search-filter/c-search-filter.component';
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
import { NgxPaginationModule } from 'ngx-pagination';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { CImageUploaderComponent } from './components/c-image-uploader/c-image-uploader.component';
import { interceptorProvider } from './interceptors/common.interceptor';
import { SimplebarAngularModule } from 'simplebar-angular';
import { VAdminScrapingComponent } from './views/v-admin-scraping/v-admin-scraping.component';


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
    CRatingStarsComponent,
    CFooterComponent,
    CDialogComponent,
    CImageUploaderComponent,

    //VIEWS
    VArtworkDetailsComponent,
    VLoginSignupComponent,
    VHomeSearchComponent,
    VProfileComponent,
    VListsComponent,
    VListDetailsComponent,
    VListEditorComponent,
    VAdminScrapingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NoopAnimationsModule,
    MatIconModule,
    MatProgressBarModule,
    NgxPaginationModule,
    BrowserModule,
    LeafletModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    SimplebarAngularModule
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
