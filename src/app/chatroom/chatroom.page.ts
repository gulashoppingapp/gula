import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { UserService } from '../user.service';
import { Location } from '@angular/common';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ViewcontactService } from '../viewcontact.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.page.html',
  styleUrls: ['./chatroom.page.scss'],
})
export class ChatroomPage implements OnInit {

  chatCollection: AngularFirestoreCollection
  chatdata: Observable<any>

  userCollection: AngularFirestoreCollection
  userdata: Observable<any>
  recieverdata: Observable<any>
  chatnumber: Observable<any>
  messagenumber

  recievername: string

  recieverid: string

  senderid: string

  sendername: string

  senderpic

  text

  message

  number

  profilepic

  constructor(
    public chat: ChatService,
    public user: UserService,
    private location: Location,
    public afs: AngularFirestore,
    private router: Router,
    public contact: ViewcontactService
  ) {
    this.recieverid = chat.getChatRecieverId()
    this.recievername = chat.getChatRecieverName()
    this.senderid = user.getId()
    //this.senderpic = user.getpicture()
    console.log(this.senderid)

    this.userCollection = this.afs.collection('users')
    this.recieverdata = this.userCollection.doc(this.recieverid).valueChanges()
    this.recieverdata.subscribe((data) => {
      this.profilepic = data.picture
      this.messagenumber = data.messages
    })


    this.chatCollection = afs.collection('users').doc(this.senderid).collection('chats'/*, ref => 
      ref.orderBy('timestamp')*/).doc(this.recieverid).collection('messages', ref =>
      ref.orderBy('timestamp'))
    this.chatdata = this.chatCollection.valueChanges()

    console.log( this.recievername + this.recieverid)
   }

  ngOnInit() {
    this.userCollection = this.afs.collection('users')
    this.userdata = this.userCollection.doc(this.senderid).valueChanges()
    this.userdata.subscribe((data) => {
      this.sendername = data.username
      this.senderpic = data.picture
      console.log(this.sendername)
    })
    
  }

  send() {
    if (this.text != "") {
      this.message = this.text
      this.text = ""
      
    this.chatnumber = this.userCollection.doc(this.recieverid).collection('chats').doc(this.senderid).valueChanges()
    this.chatnumber.subscribe((data) => {
      if(data.number) {
        this.number = data.number 
      } else {
        this.number = 0
      }
    })

    var newNumber = this.number + 1
    var newMessages = newNumber + this.messagenumber

    console.log(this.number)
      

      this.afs.collection('users').doc(this.recieverid).collection('chats').doc(this.senderid).collection('messages').add({
        message: this.message,
        authorid: this.senderid,
        authorname: this.sendername,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      }).then(() => {
        this.afs.collection('users').doc(this.senderid).collection('chats').doc(this.recieverid).collection('messages').add({
          message: this.message,
          authorid: this.senderid,
          authorname: this.sendername,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
      }).then(() => {
        this.afs.collection('users').doc(this.recieverid).collection('chats').doc(this.senderid).set({
          name: this.sendername,
          person: this.senderid,
          message: this.message,
          number: newNumber,
          sender: this.senderid,
          picture: this.senderpic,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
          this.afs.collection('users').doc(this.senderid).collection('chats').doc(this.recieverid).set({
            name: this.recievername,
            picture: this.profilepic,
            person:this.recieverid,
            status: "unseen",
            message: this.message,
            sender: this.senderid,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
          })
        }).then(() => {
          this.afs.collection('users').doc(this.recieverid).update({
            messages: newMessages
          }).then(() => {this.message = "";})
        })
      })
      
    }
  }

  viewcontact() {
    this.senderid = this.user.getId()
    
    if (this.senderid == this.recieverid){
      this.router.navigate(['/menu/account'])
    } else {
      this.contact.setcontact({
        id: this.recieverid,
        name: this.recievername,
        picture: this.profilepic
      })
      this.router.navigate(['/menu/viewcontact'])
    }
  }

  back() {
    this.location.back()
  }

}
