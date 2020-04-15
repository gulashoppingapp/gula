import { Injectable } from '@angular/core';

interface chatdata {
  recieverid: string,
  recievername: string
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private chatdata: chatdata

  constructor() { }

  setchatdata(chatdata: chatdata){
    this.chatdata = chatdata
  }

  getChatRecieverId() {
    return this.chatdata.recieverid
  }

  getChatRecieverName() {
    return this.chatdata.recievername
  }
}
