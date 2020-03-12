import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  buyerid: string

  space = " "
  
  postsCollection: AngularFirestoreCollection;
  
  posts: Observable<any>;

  category: string = ""

  userid: string

  constructor(
    private router: Router,
    public afs: AngularFirestore,
    public user: UserService,
    public alert: AlertController
  ) {
    /*if (this.category === "") {
      this.category = "all"
    }*/
    this.postsCollection = afs.collection('posts'/*, ref => 
      ref.where('authorid', '==', this.category)*/);
    this.posts = this.postsCollection.valueChanges()
   }

  ngOnInit() {
  }

  search() {
    this.router.navigate(['/menu/search'])
  }
  
  createpost() {
    this.router.navigate(['/menu/createpost'])
  }

  notifications() {
    this.router.navigate(['/menu/notifications'])
  }

  chats() {
    this.router.navigate(['/menu/chats'])
  }

  categories() {
    this.router.navigate(['/menu/categories'])
  }

  filter() {
    this.router.navigate(['/menu/filter'])
  }

  buy(authorid, itemname) {
    try{
      const message = "Showed interest in your "+ itemname
      this.buyerid = this.user.getId()

      if (this.buyerid !== authorid) {
        this.afs.collection('notifications').add({
          buyerid: this.buyerid,
          message: message,
          authorid: authorid
        })
      }
    } catch {
      this.router.navigate(['/menu/login'])
      this.showAlert("Login", "Login in order to sell")
    }
  }

  createswap() {
    this.router.navigate(['/menu/createswap'])
  }

  async showAlert(header, message) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ["ok"]
    })
    await alert.present()
  }

}
