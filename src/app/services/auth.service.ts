import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HOST } from "src/constants";
import { AppEndpoints } from "../app.endpoints";

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(private httpClient: HttpClient) { }

    public login(body): Observable<Object> {
        return this.httpClient.post(`${HOST}${AppEndpoints.LOGIN}`, body);
    }
}