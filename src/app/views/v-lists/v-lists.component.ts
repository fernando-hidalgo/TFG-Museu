import { Component, OnInit } from '@angular/core';
import { ArtlistService } from 'src/app/services/artlist.service';

@Component({
  selector: 'app-v-lists',
  templateUrl: './v-lists.component.html',
  styleUrls: ['./v-lists.component.scss']
})
export class VListsComponent implements OnInit {
  lists
  currentUser = 2  //TODO: Debe ser cambiado por datos del usuario actualmente logueado

  constructor(private artlistService: ArtlistService) { }

  ngOnInit(): void {
    this.artlistService.getUserLists(this.currentUser).subscribe(data => {
      this.lists = data
    });
  }

}
