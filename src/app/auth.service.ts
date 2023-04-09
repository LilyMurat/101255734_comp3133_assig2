import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';

const LOGIN_GRAPHQL = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            userId
            token
            tokenExpiration
        }
    }
`;

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    
    private tokenSubject = new BehaviorSubject<string | null>(null);
    token$ = this.tokenSubject.asObservable();


    constructor(private apollo: Apollo) 
    { 
        
    }

    logout(): void {
        localStorage.removeItem('token');
        this.tokenSubject.next(null);
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    isLogin(): boolean {
        return !!this.getToken();
    }

    async login(username: string, password: string): Promise<void> {
        const result = await this.apollo
            .mutate<{ login: { token: string } }>({
                mutation: LOGIN_GRAPHQL,
                variables: { username, password },
            })
            .toPromise();
        if (result) {
            console.log({ result });
            const token = result.data?.login.token;
            if (token) {
                localStorage.setItem('token', token);
                this.tokenSubject.next(token);
                return;
            }
        }

        throw new Error('Login failed');
    }



}


