import { Component, OnInit } from '@angular/core';
import { ArtworkService } from 'src/app/services/artwork.service';


@Component({
  selector: 'app-v-home-search',
  templateUrl: './v-home-search.component.html',
  styleUrls: ['./v-home-search.component.scss']
})

export class VHomeSearchComponent implements OnInit {
  cards = [1,2,3]
  userRatings = [];

  constructor(private artworkService: ArtworkService) { }

  ngOnInit(): void {
    this.artworkService.getArtworkById().subscribe(data => {
      console.log(data);
    });
  }
}
