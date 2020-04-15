import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { AlertController } from '@ionic/angular';
import * as firebase from 'firebase';
import { CategoriesService } from '../categories.service';
import { SwapService } from '../swap.service';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  none = "none"
  true = "true"

  //orders
  orderitemname
  orderlocation
  orderminprice = ""
  ordermaxprice = ""

  //buyer data
  buyerid: string
  buyername: string
  userid: string
  buyerpic

  userdata: Observable<any>;
  space = " "
  
  postsCollection: AngularFirestoreCollection;

  userscollection: AngularFirestoreCollection;
  
  posts: Observable<any>;

  messages
  nomessages = 0


  category: string = ""
  subcategory
  brand
  model
  pricemin
  pricemax
  condition
  usedperiod
  location
  vendor
  aquiretype


  constructor(
    private router: Router,
    public afs: AngularFirestore,
    public user: UserService,
    public alert: AlertController,
    public categoryselected: CategoriesService,
    public postservice: PostsService,
    activeRoute: ActivatedRoute,
    public swap: SwapService
  ) {
    /*if (this.category === "") {
      this.category = "all"
    }*/
    //this.category = activeRoute.snapshot.params["category"];

    //if(this.vendortype == "gula") {}

    this.buyerpic = user.getpicture()

    this.category = categoryselected.getsubcategory().category
    this.subcategory = categoryselected.getsubcategory().name
    this.brand = categoryselected.getFilter().brand
    this.model = categoryselected.getFilter().model
    this.pricemin = categoryselected.getFilter().pricemin
    this.pricemax = categoryselected.getFilter().pricemax
    this.condition = categoryselected.getFilter().condition
    this.usedperiod = categoryselected.getFilter().usedperiod
    this.location = categoryselected.getFilter().location
    this.vendor = categoryselected.getFilter().from
    this.aquiretype = categoryselected.getFilter().aquire
    console.log(this.category+" "+this.subcategory);

    if (this.category == this.none) {
      this.postsCollection = afs.collection('posts'/*, ref => 
      ref.where('postcategory', '==', this.category)*/);
      this.posts = this.postsCollection.valueChanges()
    } else {
      /*this.postsCollection = afs.collection('posts', ref => 
      ref.where('postcategory', '==', this.category));
      this.posts = this.postsCollection.valueChanges()*/

      if(this.subcategory == this.none) {
        this.postsCollection = afs.collection('posts', ref => 
        ref.where("postcategory", "==", this.category));
        this.posts = this.postsCollection.valueChanges()
      } else {
        if (this.brand == this.none){
          this.postsCollection = afs.collection('posts', ref=>
          ref.where("subcategory", "==", this.subcategory));
          this.posts = this.postsCollection.valueChanges()
        } else {
          if (this.model == this.none) {
            this.postsCollection = afs.collection('posts', ref=>
            ref.where("brand", "==", this.brand))
          } else {
            this.postsCollection = afs.collection('posts', ref=>
            ref.where("model", "==", this.model))
          }
        }
      }
    }

    

    this.userscollection = afs.collection('users')
    
    try {
      this.userdata = this.userscollection.doc(this.user.getId()).valueChanges()

    this.userdata.subscribe((data) => {
      this.buyername = data.username
      console.log(this.buyername)

      if(data.messagenumber) {
        this.messages = data.messagenumber
      } else {
        this.messages = 0
      }
    })
    } catch {
      this.router.navigate(['/menu/login'])
      this.showAlert("Login", "Login in order to use gula")
    }
   }

  ngOnInit() {
    
  }

  search() {
    this.router.navigate(['/menu/search'])
  }

  createcategories() {
    this.router.navigate(['/menu/createcategories'])
  }
  
  createpost() {
    //this.router.navigate(['/menu/createpost'])
    this.createcategories()
  }

  notifications() {
    this.router.navigate(['/menu/notifications'])
  }

  chats() {
    this.router.navigate(['/menu/chats'])
  }

  categories() {
    this.router.navigate(['/menu/categories'])
  }

  filter() {
    this.router.navigate(['/menu/filter'])
  }

  buy(authorid, authorname, itemname, picture, price, description) {
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
        sellername: authorname,
        picture: picture,
        price: price,
        description: description,
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

  favorites(postid, picture, item, price, description, ownerid, ownername) {

    this.userdata = this.userscollection.doc(this.user.getId()).valueChanges()
    this.userdata.subscribe((data) => {
      this.buyername = data.username
      console.log(this.buyername)
    })

    this.afs.collection('users').doc(this.user.getId()).collection('favorites').doc(postid).set({
      picture: picture,
      itemname: item,
      description: description,
      price: price,
      authorid: ownerid,
      authorname: ownername
    })
  }

  viewItem(picture, name, price, description, sellername, sellerpic, sellerid, timestamp) {
    this.postservice.setPost({
      picture: picture,
      itemname: name,
      price: price,
      description: description,
      sellername: sellername,
      sellerid: sellerid,
      sellerpic: sellerpic,
      timestamp: timestamp
    })
    this.router.navigate(['menu/viewitem'])
  }

  placeOrder() {
    this.buyerid = this.user.getId()
    const id = this.afs.createId()

    this.userdata = this.userscollection.doc(this.user.getId()).valueChanges()
    this.userdata.subscribe((data) => {
      this.buyername = data.username
      console.log(this.buyername)
    })

    this.afs.collection('notifications').doc(id).set({
      notificationid: id,
      buyerid: this.buyerid,
      buyername: this.buyername,
      itemname: this.orderitemname,
      location: this.orderlocation,
      minprice: this.orderminprice,
      maxprice: this.ordermaxprice
    }).then(() => {
      this.orderminprice = ""
      this.ordermaxprice = ""
      this.orderlocation = ""
      this.orderitemname = ""
    })
  }

  async showAlert(header, message) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ["ok"]
    })
    await alert.present()
  }

}
