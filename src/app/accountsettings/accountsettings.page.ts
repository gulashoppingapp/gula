import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-accountsettings',
  templateUrl: './accountsettings.page.html',
  styleUrls: ['./accountsettings.page.scss'],
})
export class AccountsettingsPage implements OnInit {

  userCollection: AngularFirestoreCollection;
  userdata: Observable<any>;

  pic

  no = "no"
  yes = "yes"
  changed = "no"

  picture = "";
  username = "";
  userlocation = "";
  biography = "";
  mobilenumber = "";

  constructor(
    private location: Location,
    public user: UserService,
    public afs: AngularFirestore
  ) { 
    this.userCollection = afs.collection('users')
    this.userdata = this.userCollection.doc(user.getId()).valueChanges()
    this.userdata.subscribe((data) => {
      this.pic = data.picture
    })
  }

  ngOnInit() {
  }

  goback() {
    this.location.back()
  }

  save() {}

}
