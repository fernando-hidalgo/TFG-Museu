import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, Subscription } from 'rxjs';
import { ArtworkService } from 'src/app/services/artwork.service';
import { RatingService } from 'src/app/services/rating.service';

@Component({
  selector: 'app-v-artwork-details',
  templateUrl: './v-artwork-details.component.html',
  styleUrls: ['./v-artwork-details.component.scss']
})
export class VArtworkDetailsComponent implements OnInit {
  literals = {
    button: 'Escribir reseña'
  }
  currentUser = 5  //TODO: Debe ser cambiado por el id del usuario actualmente logueado

  data;
  ratings
  curretUserRating;

  constructor(private route: ActivatedRoute, private artworkService: ArtworkService, private ratingService: RatingService) { }

  async ngOnInit() {
    this.route.params.subscribe(async params => {
      let artworkId = params['artworkId']

      this.data = await firstValueFrom(this.getArtworkById(artworkId));
      this.ratings = await firstValueFrom(this.getRatingByArtworkId(artworkId));
      this.curretUserRating = await this.orderRatings()
    });
  }

  getArtworkById(id) {
    return this.artworkService.getArtworkById(id);
  }

  getRatingByArtworkId(id) {
    return this.ratingService.getRatingByArtworkId(id);
  }

  /*
    En el caso que el usuario actual haya valorado la obra, 
    las reseñas se reordenan, para mostrar la propia como la primera
  */
  async orderRatings(){
    const curretUserRating = this.ratings.find(r => r.id === this.currentUser);
    if (curretUserRating){
      this.ratings = [curretUserRating, ...this.ratings.filter(r => r.id !== this.currentUser)];
      return curretUserRating
    } else {
      return true
    }
  }
}
