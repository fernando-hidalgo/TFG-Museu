import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-c-review-card',
  templateUrl: './c-review-card.component.html',
  styleUrls: ['./c-review-card.component.scss']
})
export class CReviewCardComponent implements OnInit {
  @Input() ratingData
  text: string
  isMe: boolean

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.text = this.ratingData.text.replace(/\n/g, '<br>')
    this.isMe = this.authService.userMe()?.authId
  }

}
