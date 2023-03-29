import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ArtlistService } from 'src/app/services/artlist.service';

@Component({
  selector: 'app-v-list-details',
  templateUrl: './v-list-details.component.html',
  styleUrls: ['./v-list-details.component.scss']
})
export class VListDetailsComponent implements OnInit {
  page:number = 1;
  data

  constructor(private route: ActivatedRoute, private artlistService: ArtlistService) { }

  ngOnInit(): void {
    this.route.params.subscribe(async params => {
      let artlistId = params['artlistId']

      this.artlistService.getListContent(artlistId).subscribe(data => {
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
