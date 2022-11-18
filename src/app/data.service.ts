import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  private baseURL = 'http://localhost:3000/users/';
  private firstnameobs = new BehaviorSubject<string>('');
  currentfirstnameobs = this.firstnameobs.asObservable();

  private lastnameobs = new BehaviorSubject<string>('');
  currentlastnameobs = this.lastnameobs.asObservable();

  private emailobs = new BehaviorSubject<string>('');
  currentemailobs = this.emailobs.asObservable();

  private idobs = new BehaviorSubject<string>('');
  currentidobs = this.idobs.asObservable();
  users:any = [];

  updateApprovalMessage(firstname: string, lastname: string,email:string) {
  this.firstnameobs.next(firstname);
  this.lastnameobs.next(lastname);
  this.emailobs.next(email);
}

updateId(id: any) {
  
  this.idobs.next(id);
  // this.getAll().subscribe((data: any[])=>{
  //   // console.log(data);
  //   this.users = data;
  // })  
  
}

getupdateid(){
  return this.currentidobs;
}

getAll(): Observable<Object> {
  return this.http.get(this.baseURL);
  
}






}
