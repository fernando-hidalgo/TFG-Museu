import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CDialogComponent } from 'src/app/components/c-dialog/c-dialog.component';
import { ArtworkService } from 'src/app/services/artwork.service';
import { AuthService } from 'src/app/services/auth.service';
import { RatingService } from 'src/app/services/rating.service';

@Component({
  selector: 'app-v-artwork-details',
  templateUrl: './v-artwork-details.component.html',
  styleUrls: ['./v-artwork-details.component.scss']
})
export class VArtworkDetailsComponent implements OnInit {
  literals = {
    writeReviewButton: 'Escribir reseña',
    editReviewButton: 'Editar reseña'
  }
  currentUser: number
  artwork;
  ratings;
  curretUserRating;
  disableReview: boolean;

  constructor(
    private route: ActivatedRoute,
    private artworkService: ArtworkService,
    private ratingService: RatingService,
    private authService: AuthService,
    private dialog: MatDialog
  ) { }

  async ngOnInit() {
    this.currentUser = this.authService.userMe()?.authId

    this.route.params.subscribe(async params => {
      let artworkId = params['artworkId']

      this.artwork = await firstValueFrom(this.getArtworkById(artworkId));
      this.ratings = await firstValueFrom(this.getRatingByArtworkId(artworkId));
      this.curretUserRating = await this.currentUserRatingToTop()
      this.disableReview = this.curretUserRating?.id ? false : true
    });
  }

  /*
    En el caso que el usuario actual haya valorado la obra, 
    las reseñas se reordenan, para mostrar la propia como la primera
  */
  async currentUserRatingToTop(){
    const curretUserRating = this.ratings.find(r => r.user.id === this.currentUser);
    if (curretUserRating) this.orderRatings(curretUserRating);
    return curretUserRating || '';
  }

  updateRatings(data){
    if(data.mode === 'delete'){
      this.ratings = this.ratings.filter(r => r.id !== data.ratingId);
      this.curretUserRating = ''
      this.updateArtworkAverageRating();
      this.disableReview = true
    } else {
      this.getRatingById(data.ratingId).subscribe(newRating => {
        this.curretUserRating = newRating
        this.ratings.push(newRating);
        this.orderRatings(newRating);
        this.disableReview = false;
        this.updateArtworkAverageRating();
      });
    }
  }

  updateArtworkAverageRating() {
    const sum = this.ratings.reduce((total, item) => total + item.value, 0);
    this.artwork.averageRating = sum / this.ratings.length || 0;

    let body = {
      name: this.artwork.name,
      picLink: this.artwork.picLink,
      date: this.artwork.date,
      artist: this.artwork.artist,
      museum: this.artwork.museum,
      description: this.artwork.description,
      style: this.artwork.style,
      colection: this.artwork.colection,
      display: this.artwork.display,
      room: this.artwork.room,
      averageRating: this.artwork.averageRating
    }

    this.artworkService.updateArtowrk(this.artwork.id, body).subscribe();
  }

  orderRatings(curretUserRating){
    this.ratings = [curretUserRating, ...this.ratings.filter(r => r.user.id !== this.currentUser)];
  }

  getArtworkById(id) {
    return this.artworkService.getArtworkById(id);
  }

  getRatingByArtworkId(id) {
    return this.ratingService.getRatingByArtworkId(id);
  }

  getRatingById(id){
    return this.ratingService.getRatingById(id);
  }

  openReviewDialog() {
    const dialogRef = this.dialog.open(CDialogComponent,{
      data:{
        type: "review",
        rating: this.curretUserRating,
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result) {
        this.curretUserRating = result
        this.ratings[0] = result //El primer rating siempre es del usuario logueado
      }
    });
  }

  openAddToListDialog() {
    this.dialog.open(CDialogComponent,{
      data:{
        type: "add-list",
        userId: this.currentUser,
        artworkId: this.artwork.id
      },
      autoFocus: false
    });
  }
}
