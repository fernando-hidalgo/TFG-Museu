import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ArtlistService } from 'src/app/services/artlist.service';

@Component({
  selector: 'app-v-lists',
  templateUrl: './v-lists.component.html',
  styleUrls: ['./v-lists.component.scss']
})
export class VListsComponent implements OnInit {
  lists

  constructor(private artlistService: ArtlistService, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(urlParams => this.artlistService.getUserLists(urlParams['userId']))
    ).subscribe(data => {
      this.lists = data;
    });
  }

}
