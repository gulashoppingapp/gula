import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from '../user.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  userid: string

  notificationsCollection: AngularFirestoreCollection;

  notifications: Observable<any>

  constructor(
    private location: Location,
    public user: UserService,
    public afs: AngularFirestore
  ) {
    if (user.getId()) {
      this.userid = user.getId()
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

}
