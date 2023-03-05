import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-v-profile',
  templateUrl: './v-profile.component.html',
  styleUrls: ['./v-profile.component.scss']
})
export class VProfileComponent implements OnInit {
  cards = [1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3]
  userRatings = [1];

  constructor() { }

  ngOnInit(): void {
  }

}
