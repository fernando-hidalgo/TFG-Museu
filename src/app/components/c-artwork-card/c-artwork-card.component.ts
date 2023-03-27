import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-c-artwork-card',
  templateUrl: './c-artwork-card.component.html',
  styleUrls: ['./c-artwork-card.component.scss']
})
export class CArtworkCardComponent implements OnInit {
  @Input() data;
  @Input() seen;
  @Input() userRating;

  decimalPoint = 10
  editMode = false;

  constructor() { }

  ngOnInit(): void {
    this.data.averageRating = Math.round((this.data.averageRating + Number.EPSILON) * this.decimalPoint) / this.decimalPoint
  }

}
