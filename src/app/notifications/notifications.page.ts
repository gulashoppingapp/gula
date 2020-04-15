import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from '../user.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ChatService } from '../chat.service';
import { Router } from '@angular/router';
import { ViewswapService } from '../viewswap.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  userid: string
  userpic

  notificationsCollection: AngularFirestoreCollection;

  notifications: Observable<any>

  constructor(
    private location: Location,
    public user: UserService,
    public afs: AngularFirestore,
    public chat: ChatService,
    private router: Router,
    public swapService: ViewswapService
  ) {
    if (user.getId()) {
      this.userid = user.getId()
      this.userpic = user.getpicture()
      this.notificationsCollection = afs.collection('notifications', ref =>
      ref.where('authorid', '==', this.userid))
      this.notifications = this.notificationsCollection.valueChanges()
    }
   }

  ngOnInit() {
  }

  gohome() {
    this.location.back()
  }

  open(buyerid, buyerpic, buyername, agenda, picture, item, price, description) {
    if (agenda == "buy") {
      this.chat.setchatdata({
        recieverid: buyerid,
        recievername: buyername
      })
      this.router.navigate(['/menu/chatroom'])
    }

    if (agenda == "swap") {
      this.swapService.setData({
        buyerid: buyerid,
        buyername: buyername,
        buyerpic: this.userpic,
        picture: picture,
        itemname: item,
        itemprice: price,
        description: description
      })
      this.router.navigate(['/menu/viewswap'])
    }
  }

}
