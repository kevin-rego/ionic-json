import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { DataService } from '../data.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  constructor(private http:HttpClient,public toastController: ToastController, public dataservice: DataService) {}
  firstname:string;
  lastname:string;
  email: string;
  avatar: string = "https://ionicframework.com/docs/img/demos/avatar.svg";
  @ViewChild('myForm') form: NgForm;


  onSubmit(){
    console.log(this.form);

    this.firstname = this.form.value.personDetails.firstname;
    this.lastname = this.form.value.personDetails.lastname;
    this.email = this.form.value.personDetails.email;
    this.avatar = "https://ionicframework.com/docs/img/demos/avatar.svg";
    this.postDetails(this.firstname, this.lastname, this.email, this.avatar);
    this.form.reset();
    this.presentToast();
    this.dataservice.getAll();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your details have been added.',
      duration: 1500,
    });
    toast.present();
  }
  postDetails(fn, ln, em, av){
    this.http.post('http://localhost:3000/users', 
    {email: em, first_name : fn, last_name : ln, avatar: av}).subscribe((response)=>
    
    {
      console.log(response);
    });

  }
}
