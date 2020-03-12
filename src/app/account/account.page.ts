import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  usercollection: AngularFirestoreCollection

  userdata: Observable<any>

  constructor(
    private router: Router,
    public user: UserService,
    public afs: AngularFirestore
  ) { 
    try {
      this.usercollection = afs.collection('users')
    this.userdata = this.usercollection.doc(user.getId()).valueChanges()
    } catch (err) {this.router.navigate(['/menu/login'])}
  }

  ngOnInit() {
  }

  createpost() {
    this.router.navigate(['/menu/createpost'])
  }
}
