import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {

  firstname:any="";
  lastname:any="";
  email:any="";
  id:any;
  users:any = [];

  constructor(private modalCtrl: ModalController,private http:HttpClient,private dataService:DataService, public toastController: ToastController) { }

  ngOnInit() {
    this.dataService.currentidobs.subscribe(msg => this.id = msg);
    this.dataService.currentfirstnameobs.subscribe(msg => this.firstname = msg);
    this.dataService.currentlastnameobs.subscribe(msg => this.lastname = msg);
    this.dataService.currentemailobs.subscribe(msg => this.email = msg);
    this.dataService.getAll().subscribe((data: any[])=>{
      console.log(data);
      this.users = data;
    })  
    
    // this.firstname = "Hello"; 
    // this.lastname = currentproduct.lastname;
    // this.email = currentproduct.email;
  }
  


  onSubmit(){
    this.presentToast();
    // this.dataService.updateApprovalMessage(this.firstname,this.lastname, this.email);
    
   
    this.http.put('http://localhost:3000/users/'+this.id,{email: this.email, first_name : this.firstname, last_name : this.lastname, avatar:"https://ionicframework.com/docs/img/demos/avatar.svg"})
   .subscribe();    
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your details have been saved.',
      duration: 1200,
    });
    toast.present();
  }
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
}
