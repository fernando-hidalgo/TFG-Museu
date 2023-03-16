import { Component, OnInit } from '@angular/core';
import { ArtworkService } from 'src/app/services/artwork.service';

@Component({
  selector: 'app-v-home-search',
  templateUrl: './v-home-search.component.html',
  styleUrls: ['./v-home-search.component.scss']
})

export class VHomeSearchComponent implements OnInit {
  data: any;
  page: number = 1;

  constructor(private artworkService: ArtworkService) { }

  ngOnInit(): void {
    this.getAllArtworks()
  }

  getAllArtworks() {
    this.artworkService.getAllArtworks().subscribe(data => {
      this.loadData(data);
    });
  }

  updateData(event){
    this.loadData(event.data)
  }

  loadData(data){
    this.data = data;
  }
}
