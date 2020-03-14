import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { AlertController } from '@ionic/angular';
import * as firebase from 'firebase';
import { CategoriesService } from '../categories.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  buyerid: string
  buyername: string

  userdata: Observable<any>;
  space = " "
  
  postsCollection: AngularFirestoreCollection;

  userscollection: AngularFirestoreCollection;
  
  posts: Observable<any>;

  category: string = ""

  userid: string

  constructor(
    private router: Router,
    public afs: AngularFirestore,
    public user: UserService,
    public alert: AlertController,
    public categoryselected: CategoriesService,

    activeRoute: ActivatedRoute
  ) {
    /*if (this.category === "") {
      this.category = "all"
    }*/
    this.category = activeRoute.snapshot.params["category"];
    console.log(this.category);
    this.postsCollection = afs.collection('posts', ref => 
      ref.where('category', '==', this.category));
    this.posts = this.postsCollection.valueChanges()

    this.userscollection = afs.collection('users')
    this.userdata = this.userscollection.doc(this.user.getId()).valueChanges()

    this.userdata.subscribe((data) => {
      this.buyername = data.username
    })
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
    const message = "Showed interest in your "
    this.buyerid = this.user.getId()

    

    console.log(this.buyername)

    this.afs.collection('notifications').add({
      authorid: authorid,
      message: message,
      itemname: itemname,
      buyerid: this.buyerid,
      buyername: this.buyername,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
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
