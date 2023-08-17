import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/utils/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  [x: string]: any;

  private userSubject: BehaviorSubject<User | undefined>;

  constructor() {
    this.userSubject = new BehaviorSubject<User | undefined>(undefined);
    this.me();
  }

  get userObservable() {
    return this.userSubject.asObservable();
  }

  async login(username: string, password: string) {
    const creds = {
      "username": username,
      "password": password
    };
    let response = await fetch('api/login', {
      method: "POST",
      body: JSON.stringify(creds)
    })
    console.log(response);
    this.me();

  }

  async register(username: string, password: string) {
    const creds = {
      "username": username,
      "password": password
    };
    let response = await fetch('api/register', {
      method: "POST",
      body: JSON.stringify(creds)
    })
    console.log(response);
    this.me();
  }

  async logout() {
    let response = await fetch('api/priv/me/logout', {
      method: "DELETE",
    })
    console.log(response);
    this.userSubject.next(undefined);
  }

  private async me() {
    let response = await fetch('api/priv/me');
    if (response.ok) {
      this.userSubject.next(await response.json())
      console.log(this.userSubject);
    } else {
      console.log(response)
    }
  }
}
