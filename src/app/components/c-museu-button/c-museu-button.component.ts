import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-c-museu-button',
  templateUrl: './c-museu-button.component.html',
  styleUrls: ['./c-museu-button.component.scss']
})
export class CMuseuButtonComponent implements OnInit {
  @Input() text

  constructor() { }

  ngOnInit(): void {
  }

}
