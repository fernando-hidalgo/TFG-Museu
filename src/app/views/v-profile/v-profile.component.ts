import { Component, OnInit } from '@angular/core';
import { ArtworkService } from 'src/app/services/artwork.service';

@Component({
  selector: 'app-v-profile',
  templateUrl: './v-profile.component.html',
  styleUrls: ['./v-profile.component.scss']
})
export class VProfileComponent implements OnInit {
  currentUser = 2  //TODO: Debe ser cambiado por datos del usuario actualmente logueado
  page: number = 1;
  data;

  constructor(private artworkService: ArtworkService) { }

  ngOnInit(): void {
    this.artworkService.getArtworkByUserId(this.currentUser).subscribe(data => {
      this.data = data;
    });
  }
}
