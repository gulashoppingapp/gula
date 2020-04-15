import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { PostsService } from '../posts.service';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { SwapService } from '../swap.service';
import { ViewcontactService } from '../viewcontact.service';

@Component({
  selector: 'app-viewitem',
  templateUrl: './viewitem.page.html',
  styleUrls: ['./viewitem.page.scss'],
})
export class ViewitemPage implements OnInit {

  usersCollection: AngularFirestoreCollection
  userdata: Observable<any>
  buyername
  buyerid
  buyerpic

  pictureUrl
  itemname
  itemPrice
  itemDescription
  ownerName
  ownerId
  ownerpic
  itemTimestamp

  constructor(
    public afs: AngularFirestore,
    private location: Location,
    private router: Router,
    public postservice: PostsService,
    public user: UserService,
    public swap: SwapService,
    public contact: ViewcontactService
  ) { 
    this.usersCollection = afs.collection('users')
    this.userdata = this.usersCollection.doc(user.getId()).valueChanges()
    this.userdata.subscribe((data) => {
      this.buyername = data.username
    })

    this.buyerpic = user.getpicture()
    this.pictureUrl = postservice.getPostPicture()
    this.itemname = postservice.getPostname()
    this.itemPrice = postservice.getPostPrice()
    this.itemDescription = postservice.getPostDescription()
    this.ownerName = postservice.getPostOwnername()
    this.ownerId = postservice.getPostOwnerid()
    this.ownerpic = postservice.getPostOwnerPicture()
    this.itemTimestamp = postservice.getPostTimestamp()
  }

  ngOnInit() {
    this.usersCollection = this.afs.collection('users')
    this.userdata = this.usersCollection.doc(this.user.getId()).valueChanges()
    this.userdata.subscribe((data) => {
      this.buyername = data.username
    })
  }

  buy() {
    const message = "Showed interest in your "
    this.buyerid = this.user.getId()
    this.buyerpic = this.user.getpicture()
    const id = this.afs.createId()

    this.userdata = this.usersCollection.doc(this.user.getId()).valueChanges()
    this.userdata.subscribe((data) => {
      this.buyername = data.username
      console.log(this.buyername)
    })

    if (this.buyerid !== this.ownerId) {
      this.afs.collection('notifications').doc(id).set({
        notificationid: id,
        authorid: this.ownerId,
        agenda: "buy",
        message: message,
        itemname: this.itemname,
        buyerid: this.buyerid,
        buyername: this.buyername,
        buyerpicture: this.buyerpic,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
    }
  }

  createswap() {
    this.buyerid = this.user.getId()

    if(this.buyerid != this.ownerId) {
      this.swap.setswap({
        swapitem: this.itemname,
        itemowner: this.ownerId,
        itemownername: this.ownerName,
        itempicture: this.pictureUrl,
        itemprice: this.itemPrice,
        description: this.itemDescription
      })
      this.router.navigate(['/menu/createswap'])
    }
  }

  favorites() {
    this.userdata = this.usersCollection.doc(this.user.getId()).valueChanges()
    this.userdata.subscribe((data) => {
      this.buyername = data.username
      console.log(this.buyername)
    })

    this.afs.collection('users').doc(this.user.getId()).collection('favorites').add({
      picture: this.pictureUrl,
      itemname: this.itemname,
      description: this.itemDescription,
      price: this.itemPrice,
      authorid: this.ownerId,
      authorname: this.ownerName
    })
  }

  viewcontact() {
    this.buyerid = this.user.getId()
    
    if (this.buyerid == this.ownerId){
      this.router.navigate(['/menu/account'])
    } else {
      this.contact.setcontact({
        id: this.ownerId,
        name: this.ownerName,
        picture: this.ownerpic
      })
      this.router.navigate(['/menu/viewcontact'])
    }
  }

  back() {
    this.location.back()
  }

}
