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

    setToken(token: string): void {
        localStorage.setItem('token', token);
    }

    getToken(): string {
        return localStorage.getItem('token');
    }

    deleteToken(): void {
        localStorage.removeItem('token');
    }

    isLogged(): boolean {
        if (this.getToken()) {
            return true;
        }
        return false;
    }

    userMe() {
        if (!this.isLogged()) return null;
        const { id, nickname } = JSON.parse(atob(this.getToken().split('.')[1]));
        return { authId: id, nickname };
    }
}