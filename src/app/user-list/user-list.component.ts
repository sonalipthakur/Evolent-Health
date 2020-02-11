import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user';
import { CrudService } from '../shared/crud.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  p = 1;
  user: User[];
  hideWhenNoUser: boolean = false;
  noData: boolean = false;
  preLoader: boolean = true;

  constructor(public crudApi: CrudService) { }

  ngOnInit() {
    this.dataState(); // Initialize student's list, when component is ready
    let s = this.crudApi.GetUsersList();
    s.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.user = [];
      data.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.user.push(a as User);
      });
    });
  }
  dataState() {
    this.crudApi.GetUsersList().valueChanges().subscribe(data => {
      this.preLoader = false;
      if(data.length <= 0){
        this.hideWhenNoUser = false;
        this.noData = true;
      } else {
        this.hideWhenNoUser = true;
        this.noData = false;
      }
    });
  }

  deleteUser(user) {
    if (window.confirm('Are sure you want to delete this student ?')) {
      this.crudApi.DeleteUser(user.$key);
    }
  }
}
