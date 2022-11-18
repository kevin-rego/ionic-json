import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EditComponent } from '../edit/edit.component';
import { DataService } from '../data.service';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

em:any="";
fn:any="";
ln:any="";
av:any="https://ionicframework.com/docs/img/demos/avatar.svg";

private baseURL = 'http://localhost:3000/users/';
  
  
users:any = [];

//  myData: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([this.users]);
//  private userbase = new BehaviorSubject<any[]>([]);
//  currentuserbase = this.userbase.asObservable();



ngOnInit(): void {
  
    this.getuser();
    // this.dataService.currentfirstnameobs.subscribe(msg => this.fn = msg)
    // this.dataService.currentemailobs.subscribe(msg => this.em = msg)
    // this.dataService.currentlastnameobs.subscribe(msg => this.ln = msg)
}



constructor(private http: HttpClient,private modalCtrl: ModalController,private dataService:DataService) {}


updateuser(userid:any){
  this.dataService.updateId(userid);
  let  currentproduct = this.users.find((p) => {return p.id === userid});
  this.dataService.updateApprovalMessage(currentproduct.first_name, currentproduct.last_name, currentproduct.email);

  this.openModal();
 
}

async openModal() {
  const modal = await this.modalCtrl.create({
    component: EditComponent,
  });
  modal.present();

  const { data, role } = await modal.onWillDismiss();

}
getuser(){
  this.http.get(this.baseURL)
   .subscribe((res: Response) => {
     this.users = res;
     
   });
}

}