import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-v-home-search',
  templateUrl: './v-home-search.component.html',
  styleUrls: ['./v-home-search.component.scss']
})
export class VHomeSearchComponent implements OnInit {
  cards = [1,2,3]
  userRatings = [];

  constructor() { }

  ngOnInit(): void {
  }

}
