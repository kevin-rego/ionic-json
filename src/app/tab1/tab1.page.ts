import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError,BehaviorSubject } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { DataService } from '../data.service';




@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  private baseURL = 'http://localhost:3000/users/';
  
  
  
  users:any = [];
//   [
//     {"id":1,"email":"george.bluth@reqres.in","first_name":"George","last_name":"Bluth","avatar":"https://reqres.in/img/faces/1-image.jpg"},
//     {"id":2,"email":"janet.weaver@reqres.in","first_name":"Janet","last_name":"Weaver","avatar":"https://reqres.in/img/faces/2-image.jpg"},
//     {"id":3,"email":"emma.wong@reqres.in","first_name":"Emma","last_name":"Wong","avatar":"https://reqres.in/img/faces/3-image.jpg"},
//     {"id":4,"email":"eve.holt@reqres.in","first_name":"Eve","last_name":"Holt","avatar":"https://reqres.in/img/faces/4-image.jpg"},
//     {"id":5,"email":"charles.morris@reqres.in","first_name":"Charles","last_name":"Morris","avatar":"https://reqres.in/img/faces/5-image.jpg"},
//     {"id":6,"email":"tracey.ramos@reqres.in","first_name":"Tracey","last_name":"Ramos","avatar":"https://reqres.in/img/faces/6-image.jpg"}
//  ];

//  myData: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([this.users]);
//  private userbase = new BehaviorSubject<any[]>([]);
//  currentuserbase = this.userbase.asObservable();



 ngOnInit(): void {
    
  // this.getuser();
  this.dataservice.getAll().subscribe((data: any[])=>{
    console.log(data);
    this.users = data;
  })  
  }


  constructor(private http: HttpClient, public dataservice: DataService) {}
  
  deleteuser(userid:any){
    this.http.delete(this.baseURL+userid)
     .subscribe();
    this.users = this.users.filter(user=>user.id!=userid);
  }

  getuser(){
    this.http.get(this.baseURL)
     .subscribe((response) => {
      console.log(this.users);
       this.users = response;
       
     });
  }


}



