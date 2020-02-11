import { Injectable } from '@angular/core';
import { User } from '../shared/user';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  usersRef: AngularFireList<any>;
  userRef: AngularFireObject<any>;

  constructor(private firedatabase: AngularFireDatabase) { }

  // Add User Object
  AddUser(user: User) {
    this.usersRef = this.firedatabase.list('users-list');
    this.usersRef.push({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobileNumber: user.mobileNumber,
      status: user.status
    });
  }

  // Fetch Single User Object
  GetUser(id: string) {
    this.userRef = this.firedatabase.object('users-list/' + id);
    return this.userRef;
  }

  // Fetch Users List
  GetUsersList() {
    this.usersRef = this.firedatabase.list('users-list');
    return this.usersRef;
  }

  // Update User Object
  UpdateUser(user: User) {
    this.userRef.update({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobileNumber: user.mobileNumber,
      status: user.status
    });
  }

  // Delete User Object
  DeleteUser(id: string) {
    this.userRef = this.firedatabase.object('users-list/' + id);
    this.userRef.remove();
  }
}
