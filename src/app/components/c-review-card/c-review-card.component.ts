import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-c-review-card',
  templateUrl: './c-review-card.component.html',
  styleUrls: ['./c-review-card.component.scss']
})
export class CReviewCardComponent implements OnInit {
  @Input() ratingData

  constructor() { }

  ngOnInit(): void {
  }

}
