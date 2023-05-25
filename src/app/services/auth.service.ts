import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HOST } from "src/constants";
import { AppEndpoints } from "../app.endpoints";
import jwt_decode from "jwt-decode";
import { NavbarService } from "./navbar.service";

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(private httpClient: HttpClient, private navbarService: NavbarService) { }

    public login(body): Observable<Object> {
        return this.httpClient.post(`${HOST}${AppEndpoints.LOGIN}`, body);
    }

    public refresh(body): Observable<Object> {
        return this.httpClient.post(`${HOST}${AppEndpoints.REFRESH}`, body);
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

    isAdmin(){
        return this.userMe()?.roles.includes('admin')
    }

    userMe() {
        if (!this.isLogged()) return null;
        var decoded = jwt_decode(this.getToken());
        return { authId: decoded['id'], nickname: decoded['nickname'], roles: decoded['roles'] };
    }
}