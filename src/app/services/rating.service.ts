import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HOST } from "src/constants";
import { AppEndpoints } from "../app.endpoints";

@Injectable({
    providedIn: 'root'
})

export class RatingService {

    constructor(private httpClient: HttpClient) { }

    public getRatingByArtworkId(id) {
        return this.httpClient.get(`${HOST}${AppEndpoints.RATING}${id}`);
    }

}