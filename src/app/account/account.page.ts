import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  postsCollection: AngularFirestoreCollection
  posts: Observable<any>

  usercollection: AngularFirestoreCollection
  userdata: Observable<any>

  username
  userid
  profilepicture
  ads
  userlocation

  constructor(
    private router: Router,
    public user: UserService,
    public afs: AngularFirestore
  ) { 
    this.profilepicture = user.getpicture()
    try {
      this.userid = user.getId()
      this.usercollection = afs.collection('users')
      this.userdata = this.usercollection.doc(user.getId()).valueChanges()
      this.userdata.subscribe((data) => {
        this.profilepicture = data.picture
        this.ads = data.ads
        this.userlocation = data.location
      })
      //this.profilepicture = user.getpicture()
      this.postsCollection = this.afs.collection('posts', ref => ref.where('authorid', '==', this.userid))
      this.posts = this.postsCollection.valueChanges()
    } catch (err) {this.router.navigate(['/menu/login'])}
  }

  ngOnInit() {
    this.profilepicture = this.user.getpicture()
    this.usercollection = this.afs.collection('users')
    this.userdata = this.usercollection.doc(this.user.getId()).valueChanges()
    this.postsCollection = this.afs.collection('posts', ref => ref.where('authorid', '==', this.userid))
    this.posts = this.postsCollection.valueChanges()
  }

  categories() {
    this.router.navigate(['/menu/createcategories'])
  }

  createpost() {
    //this.router.navigate(['/menu/createpost'])
    this.categories()
  }

  delete(id, picture) {
    var newadnumber = this.ads - 1;
    this.afs.collection('posts').doc(id).delete().then(() => {
      this.afs.collection('users').doc(this.user.getId()).update({
        ads: newadnumber
      })
    })
  }

  deliver(post) {
    const id = this.afs.createId()
    this.afs.collection('deliveries').doc(id).set({
      id: id,
      postid: post,
      sellerid: this.userid,
      status: "open",
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
  }

}
