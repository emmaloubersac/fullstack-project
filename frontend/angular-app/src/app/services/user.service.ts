import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  getUsers() { return this.http.get<User[]>(this.api); }
  getUserById(id: number) { return this.http.get<User>(`${this.api}/${id}`); }
  createUser(user: User) { return this.http.post<User>(this.api, user); }
  updateUser(user: User) { return this.http.put<User>(`${this.api}/${user.id}`, user); }
  deleteUser(id: number) { return this.http.delete(`${this.api}/${id}`); }
}
