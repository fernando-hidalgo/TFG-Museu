import { Component, OnInit } from '@angular/core';
import { ArtlistService } from 'src/app/services/artlist.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-v-lists',
  templateUrl: './v-lists.component.html',
  styleUrls: ['./v-lists.component.scss']
})
export class VListsComponent implements OnInit {
  lists
  currentUser: number

  constructor(private artlistService: ArtlistService, private authService: AuthService) { }

  ngOnInit(): void {
    this.currentUser = this.authService.userMe().authId

    this.artlistService.getUserLists(this.currentUser).subscribe(data => {
      this.lists = data
    });
  }

}
