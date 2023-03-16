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
  
  data;
  ratings
  mock: any;

  constructor(private route: ActivatedRoute, private artworkService: ArtworkService, private ratingService: RatingService) { }

  async ngOnInit() {
    this.route.params.subscribe(async params => {
      let artworkId = params['artworkId']

      this.data = await firstValueFrom(this.getArtworkById(artworkId));
      this.ratings = await firstValueFrom(this.getRatingByArtworkId(artworkId));

      console.log(this.ratings)
    });
  }

  getArtworkById(id) {
    return this.artworkService.getArtworkById(id);
  }

  getRatingByArtworkId(id) {
    return this.ratingService.getRatingByArtworkId(id);
  }

}
