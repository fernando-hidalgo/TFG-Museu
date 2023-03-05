import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-v-artwork-details',
  templateUrl: './v-artwork-details.component.html',
  styleUrls: ['./v-artwork-details.component.scss']
})
export class VArtworkDetailsComponent implements OnInit {
  literals = {
    button: 'Escribir reseña'
  }

  reviews = [1,2,3]

  constructor() { }

  ngOnInit(): void {
  }

}
