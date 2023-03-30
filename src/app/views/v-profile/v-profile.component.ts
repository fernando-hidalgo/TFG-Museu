import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private artworkService: ArtworkService) { }

  ngOnInit(): void {
    this.route.params.subscribe(async urlParams => {
      let profileId = urlParams['userId']
      let params = {}

      if(this.currentUser){
        if(profileId != this.currentUser){
          params['currentUserId'] = this.currentUser
        } else {
          params['currentUserId'] = profileId
        }
      } //En caso de no estar logeado, params se envía vacio, así el ojo siempre sale gris

      this.artworkService.findArtworkRatedByUser(profileId, params).subscribe(data => {
        this.loadData(data)
      });
    });
  }

  updateData(event){
    this.loadData(event.data)
  }

  loadData(data){
    this.data = data;
  }
}
