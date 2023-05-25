import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HOST } from "src/constants";
import { AppEndpoints } from "../app.endpoints";

@Injectable({
    providedIn: 'root'
})

export class ScrapingService {

    constructor(private httpClient: HttpClient) { }

    public getScrapingThyssen(): Observable<string> {
        return this.httpClient.get(`${HOST}${AppEndpoints.SCRAPING_THYSSEN}`) as Observable<string>;
    }

    public getScrapingPicasso(): Observable<string> {
        return this.httpClient.get(`${HOST}${AppEndpoints.SCRAPING_PICASSO}`) as Observable<string>;
    }

}