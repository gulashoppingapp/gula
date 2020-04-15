import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { ChatService } from '../chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {

  chatsCollection: AngularFirestoreCollection
  chatsdata: Observable<any>

  nomessage = 0

  picture

  status: string = "seen";

  constructor(
    private location: Location,
    public afs: AngularFirestore,
    public user: UserService,
    public chat: ChatService,
    private router: Router
  ) {
    this.chatsCollection = afs.collection('users')
    this.chatsdata = this.chatsCollection.doc(user.getId()).collection('chats').valueChanges()
    this.chatsdata.subscribe((data) => {
      this.picture = data.picture
    })
   }

  ngOnInit() {
  }

  back() {
    this.location.back()
  }

  open(personId, personName, messagenumber) {
    var newmessagenumber
    var persondata: Observable<any>

    
    this.chat.setchatdata({
      recieverid: personId,
      recievername: personName
    })
    this.afs.collection('users').doc(this.user.getId()).collection('chats').doc(personId).update({
      number: 0
    })
    this.afs.collection('users').doc(personId).collection('chats').doc(this.user.getId()).update({
      status: "seen"
    }).then(() => {
      persondata = this.afs.collection('users').doc(this.user.getId()).valueChanges()
    persondata.subscribe((data) => {
      newmessagenumber = data.messages - messagenumber
      this.afs.collection('users').doc(personId).update({
        messages: newmessagenumber
      })
    })
    })
    this.router.navigate(['/menu/chatroom'])
  }
}
