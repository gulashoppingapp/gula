import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ViewswapService } from '../viewswap.service';
import { ChatService } from '../chat.service';
import { UserService } from '../user.service';
import { ViewcontactService } from '../viewcontact.service';

@Component({
  selector: 'app-viewswap',
  templateUrl: './viewswap.page.html',
  styleUrls: ['./viewswap.page.scss'],
})
export class ViewswapPage implements OnInit {
  userid

  pictureUrl
  itemname
  itemPrice
  itemDescription
  ownerName
  ownerId
  ownerpic
  itemTimestamp

  constructor(
    private router: Router,
    private location: Location,
    public swapService: ViewswapService,
    public chat: ChatService,
    public user: UserService,
    public contact: ViewcontactService
  ) { 
    this.pictureUrl = swapService.getPicture()
    this.itemname = swapService.getItemname()
    this.itemPrice = swapService.getItemprice()
    this.itemDescription = swapService.getDescription()
    this.ownerName = swapService.getBuyername()
    this.ownerId = swapService.getBuyerid()
    this.userid = user.getId()
    this.ownerpic = swapService.getBuyerPicture()
  }

  ngOnInit() {
  }

  message() {
    this.chat.setchatdata({
      recieverid: this.ownerId,
      recievername: this.ownerName
    })
    this.router.navigate(['/menu/chatroom'])
  }

  viewcontact() {
    this.userid = this.user.getId()
    
    if (this.userid == this.ownerId){
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
