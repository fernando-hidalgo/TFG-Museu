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
  listName: string
  listDescription: string

  constructor(private artlistService: ArtlistService) { }

  ngOnInit(): void {
    const { name, text } = this.data;
    this.listDescription = text.replace(/\n/g, '<br>');
    this.listName = name;

    this.artlistService.getCover(this.data.id).subscribe((signedURL) => {
      this.cover = signedURL
    })
  }

}
