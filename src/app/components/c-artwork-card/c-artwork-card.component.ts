import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-c-artwork-card',
  templateUrl: './c-artwork-card.component.html',
  styleUrls: ['./c-artwork-card.component.scss']
})
export class CArtworkCardComponent implements OnInit {
  @Input() userRatings;
  @Input() averageRating = 2.5;
  editMode = false;
  seen = true;

  constructor() { }

  ngOnInit(): void {
  }

}
