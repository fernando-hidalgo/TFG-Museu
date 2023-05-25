import { Component, OnInit } from '@angular/core';
import { ScrapingService } from 'src/app/services/scraping.service';

@Component({
  selector: 'app-v-admin-scraping',
  templateUrl: './v-admin-scraping.component.html',
  styleUrls: ['./v-admin-scraping.component.scss']
})
export class VAdminScrapingComponent implements OnInit {
  loading: boolean = false;
  resultMessage: string = '';

  constructor(private scrapingService: ScrapingService) { }

  ngOnInit(): void {
  }

  scrapingThyssen() {
    this.loading = true;
    this.resultMessage = '';

    this.scrapingService.getScrapingThyssen().subscribe((message: string) => {
      this.resultMessage = message;
      this.loading = false;
    });
  }

  scrapingPicasso() {
    this.loading = true;
    this.resultMessage = '';

    this.scrapingService.getScrapingPicasso().subscribe((message: string) => {
      this.resultMessage = message;
      this.loading = false;
    });
  }
}
