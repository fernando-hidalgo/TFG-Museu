import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-c-review-card',
  templateUrl: './c-review-card.component.html',
  styleUrls: ['./c-review-card.component.scss']
})
export class CReviewCardComponent implements OnInit {
  @Input() ratingData
  text: string
  myId: number
  profilePic: string

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.text = this.ratingData.text.replace(/\n/g, '<br>')
    this.myId = this.authService.userMe()?.authId

    const userRaterId = this.ratingData.user.id
    this.userService.getProfilePic(userRaterId).subscribe(signedURL => {
      this.profilePic = signedURL
    });
  }

}
