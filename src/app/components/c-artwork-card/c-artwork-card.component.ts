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
  @Input() editMode = false;

  decimalPoint = 10 //Change for accuracy

  constructor() { }

  ngOnInit(): void {
    this.data.averageRating = Math.round((this.data.averageRating + Number.EPSILON) * this.decimalPoint) / this.decimalPoint
  }

}
