import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserType } from '../models/user-type.model';

@Injectable({
  providedIn: 'root'
})
export class UserTypeService {

  private api = 'http://localhost:8080/api/userTypes';

  constructor(private http: HttpClient) {}

  getUserTypes() { return this.http.get<UserType[]>(this.api); }
  getUserTypeById(id: number) { return this.http.get<UserType>(`${this.api}/${id}`); }
  createUserType(userType: UserType) { return this.http.post<UserType>(this.api, userType); }
  updateUserType(userType: UserType) { return this.http.put<UserType>(`${this.api}/${userType.id}`, userType); }
  deleteUserType(id: number) { return this.http.delete(`${this.api}/${id}`); }
  
}
