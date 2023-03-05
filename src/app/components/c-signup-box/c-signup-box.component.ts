import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-c-signup-box',
  templateUrl: './c-signup-box.component.html',
  styleUrls: ['./c-signup-box.component.scss']
})
export class CSignupBoxComponent implements OnInit {
  @Input() literals;

  constructor() { }

  ngOnInit(): void {
  }

}
