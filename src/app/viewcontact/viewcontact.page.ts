import { Component, OnInit } from '@angular/core';
import { ViewcontactService } from '../viewcontact.service';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import * as firebase from 'firebase';
import { UserService } from '../user.service';
import { SwapService } from '../swap.service';
import { Router } from '@angular/router';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-viewcontact',
  templateUrl: './viewcontact.page.html',
  styleUrls: ['./viewcontact.page.scss'],
})
export class ViewcontactPage implements OnInit {

  postCollection: AngularFirestoreCollection
  posts: Observable<any>

  usersCollection: AngularFirestoreCollection
  contactData: Observable<any>
  userdata: Observable<any>
  buyerid
  buyername
  buyerpic

  contactid
  contactname
  contactpic

  constructor(
    public contact: ViewcontactService,
    public afs: AngularFirestore,
    private location: Location,
    public user: UserService,
    public swap: SwapService,
    private router: Router,
    public postservice: PostsService
  ) { 
    this.contactid = contact.getContactId()
    this.contactname = contact.getContactName()
    this.contactpic = contact.getContactpic()
    this.buyerid = user.getId()
    this.buyerpic = user.getpicture()

    this.usersCollection = afs.collection('users')
    this.contactData = this.usersCollection.doc(this.contactid).valueChanges()

    this.postCollection = afs.collection('posts', ref => ref.where('authorid', '==', this.contactid))
    this.posts = this.postCollection.valueChanges()
  }

  ngOnInit() {
    this.userdata = this.usersCollection.doc(this.user.getId()).valueChanges()
    this.userdata.subscribe((data) => {
      this.buyername = data.username
      console.log(this.buyername)
    })
  }

  back() {
    this.location.back()
  }

  buy(authorid, itemname) {
    const message = "Showed interest in your "
    this.buyerid = this.user.getId()
    this.buyerpic = this.user.getpicture()
    const id = this.afs.createId()

    this.userdata = this.usersCollection.doc(this.user.getId()).valueChanges()
    this.userdata.subscribe((data) => {
      this.buyername = data.username
      console.log(this.buyername)
    })

    console.log(this.buyername)

    if (this.buyerid !== authorid) {
      this.afs.collection('notifications').doc(id).set({
        notificationid: id,
        authorid: authorid,
        agenda: "buy",
        message: message,
        itemname: itemname,
        buyerid: this.buyerid,
        buyername: this.buyername,
        buyerpicture: this.buyerpic,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
    }
  }

  createswap(item, owner, ownername, picture, price, description) {
    this.buyerid = this.user.getId()

    if(this.buyerid != owner) {
      this.swap.setswap({
        swapitem: item,
        itemowner: owner,
        itemownername: ownername,
        itempicture: picture,
        itemprice: price,
        description: description
      })
      this.router.navigate(['/menu/createswap'])
    }
  }

  favorites(postid, picture, item, price, description, ownerid, ownername) {

    this.userdata = this.usersCollection.doc(this.user.getId()).valueChanges()
    this.userdata.subscribe((data) => {
      this.buyername = data.username
      console.log(this.buyername)
    })

    this.afs.collection('users').doc(this.user.getId()).collection('favorites').doc(postid).set({
      picture: picture,
      itemname: item,
      description: description,
      price: price,
      authorid: ownerid,
      authorname: ownername
    })
  }

  viewItem(picture, name, price, description, sellername, sellerpic, sellerid, timestamp) {
    this.postservice.setPost({
      picture: picture,
      itemname: name,
      price: price,
      description: description,
      sellername: sellername,
      sellerid: sellerid,
      sellerpic: sellerpic,
      timestamp: timestamp
    })
    this.router.navigate(['menu/viewitem'])
  }

}
