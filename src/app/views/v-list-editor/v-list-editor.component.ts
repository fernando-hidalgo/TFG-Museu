import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-v-list-editor',
  templateUrl: './v-list-editor.component.html',
  styleUrls: ['./v-list-editor.component.scss']
})
export class VListEditorComponent implements OnInit {
  cards = [1,2,3,1,2,3,1,2,3,1,2,3]
  userRatings = [];

  constructor() { }

  ngOnInit(): void {
  }

}
