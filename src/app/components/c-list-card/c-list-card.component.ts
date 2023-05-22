import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ArtlistService } from 'src/app/services/artlist.service';

@Component({
  selector: 'app-c-list-card',
  templateUrl: './c-list-card.component.html',
  styleUrls: ['./c-list-card.component.scss']
})
export class CListCardComponent implements OnInit {
  @Input() data;
  cover: string;

  constructor(private artlistService: ArtlistService) { }

  ngOnInit(): void {
    //this.artlistService.getCover(this.data.id).subscribe((data) => {
    //  this.cover = data['url']
    //})
  }

}
