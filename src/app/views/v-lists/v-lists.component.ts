import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { ArtlistService } from 'src/app/services/artlist.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-v-lists',
  templateUrl: './v-lists.component.html',
  styleUrls: ['./v-lists.component.scss']
})
export class VListsComponent implements OnInit {
  lists
  userId: number;
  currentUser: number;
  candEdit: boolean;
  userNickname: string;

  constructor(
    private artlistService: ArtlistService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(
      tap(urlParams => {
        this.userId = urlParams['userId'];
        const user = this.authService.userMe()
        this.currentUser = user?.authId
        this.userNickname = user?.nickname
        this.candEdit = (this.currentUser && this.userId == this.currentUser);
      }),
      switchMap(() => this.artlistService.getUserLists(this.userId))
    ).subscribe(data => {
      this.lists = data;
    });
  }

  navigateToProfile(){
    this.router.navigate(['/profile', this.userId]);
  }

  createNewList(){
    const body = {
      name: 'Nueva lista',
      text: '',
      userId: this.currentUser
    }

    this.artlistService.createList(body).subscribe(() => {
      this.artlistService.getUserLists(this.userId).subscribe(data => {
        this.lists = data
      })
    })
  }
}
