import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-c-list-card',
  templateUrl: './c-list-card.component.html',
  styleUrls: ['./c-list-card.component.scss']
})
export class CListCardComponent implements OnInit {
  @Input() data;

  constructor() { }

  ngOnInit(): void {
  }

}
