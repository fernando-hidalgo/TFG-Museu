import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-c-review-card',
  templateUrl: './c-review-card.component.html',
  styleUrls: ['./c-review-card.component.scss']
})
export class CReviewCardComponent implements OnInit {
  @Input() ratingData
  isMe: boolean

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isMe = this.authService.userMe()?.authId
    
  }

}
