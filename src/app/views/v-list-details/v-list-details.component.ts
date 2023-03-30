import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtlistService } from 'src/app/services/artlist.service';

@Component({
  selector: 'app-v-list-details',
  templateUrl: './v-list-details.component.html',
  styleUrls: ['./v-list-details.component.scss']
})
export class VListDetailsComponent implements OnInit {
  page:number = 1;
  data

  currentUser = 2  //TODO: Debe ser cambiado por datos del usuario actualmente logueado

  constructor(private route: ActivatedRoute, private artlistService: ArtlistService) { }

  ngOnInit(): void {
    this.route.params.subscribe(async urlParams => {
      let params = {}
      let artlistId = urlParams['artlistId']
      if (this.currentUser) params['currentUserId'] = this.currentUser

      this.artlistService.getListContent(artlistId, params).subscribe(data => {
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
