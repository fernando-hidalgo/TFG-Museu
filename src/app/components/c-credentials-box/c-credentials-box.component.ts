import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-c-credentials-box',
  templateUrl: './c-credentials-box.component.html',
  styleUrls: ['./c-credentials-box.component.scss']
})
export class CCredentialsBoxComponent implements OnInit {
  public isLogin: boolean = true;
  public isSignUp: boolean = true;

  @Input() title: string = ''

  constructor() { }

  ngOnInit(): void {
    console.log(this.title);
  }

}
