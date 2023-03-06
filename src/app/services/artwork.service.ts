import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class ArtworkService {

    constructor(private httpClient: HttpClient) { }

    public getArtworkById() {
        return this.httpClient.get(environment.host + '/artwork/1');
    }

}