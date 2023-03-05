import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-v-list-details',
  templateUrl: './v-list-details.component.html',
  styleUrls: ['./v-list-details.component.scss']
})
export class VListDetailsComponent implements OnInit {
  cards = [1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3]
  userRatings = [];

  constructor() { }

  ngOnInit(): void {
  }

}
