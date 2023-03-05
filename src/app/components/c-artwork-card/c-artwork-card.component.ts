import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-c-artwork-card',
  templateUrl: './c-artwork-card.component.html',
  styleUrls: ['./c-artwork-card.component.scss']
})
export class CArtworkCardComponent implements OnInit {
  @Input() userRatings;

  constructor() { }

  ngOnInit(): void {
  }

}
