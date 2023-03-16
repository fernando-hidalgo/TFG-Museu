import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArtworkService } from 'src/app/services/artwork.service';

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

  reviews = [1,2,3]

  constructor(private route: ActivatedRoute, private artworkService: ArtworkService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getArtworkById(params['artworkId'])
    });
  }

  getArtworkById(id) {
    this.artworkService.getArtworkById(id).subscribe(data => {
      this.data = data;
      console.log(this.data)
    });
  }

}
