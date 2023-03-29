import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HOST } from "src/constants";
import { AppEndpoints } from "../app.endpoints";

@Injectable({
    providedIn: 'root'
})

export class ArtlistService {

    constructor(private httpClient: HttpClient) { }

    public getUserLists(id) {
        return this.httpClient.get(`${HOST}${AppEndpoints.ARTLIST_OF_USER}${id}`);
    }

}