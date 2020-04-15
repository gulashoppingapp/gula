import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { SwapService } from '../swap.service';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  userscollection: AngularFirestoreCollection
  userdata: Observable<any>
  buyername
  buyerid
  buyerpic

  favoritesCollection: AngularFirestoreCollection
  favorites: Observable<any>

  space = " "

  constructor(
    private location: Location,
    private router: Router,
    public afs: AngularFirestore,
    public user: UserService,
    public swap: SwapService,
    public popover: PopoverController
  ) {
    this.buyerpic = user.getpicture()
    this.userscollection = afs.collection('users')
    this.favoritesCollection = afs.collection('users').doc(user.getId()).collection('favorites')
    this.favorites = this.favoritesCollection.valueChanges()
   }

  ngOnInit() {
    this.userdata = this.userscollection.doc(this.user.getId()).valueChanges()
    this.userdata.subscribe((data) => {
      this.buyername = data.username
      console.log(this.buyername)
    })
  }

  gohome() {
    this.location.back()
  }

  buy(authorid, itemname) {
    const message = "Showed interest in your "
    this.buyerid = this.user.getId()
    this.buyerpic = this.user.getpicture()
    const id = this.afs.createId()

    this.userdata = this.userscollection.doc(this.user.getId()).valueChanges()
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

  /*async presentPopover() {
    const popover = await this.popover.create({
      component:,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }*/
  
}
