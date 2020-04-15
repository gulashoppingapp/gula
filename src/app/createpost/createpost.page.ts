import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { firestore } from 'firebase/app';
import * as firebase from 'firebase';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { async } from '@angular/core/testing';
import { CategoriesService } from '../categories.service';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.page.html',
  styleUrls: ['./createpost.page.scss'],
})
export class CreatepostPage implements OnInit {

  category
  selectedbrand
  selectedmodel

  none = "none"
  true = "true"

  brandcollection: AngularFirestoreCollection
  brands: Observable<any>

  model
  modelscollection: AngularFirestoreCollection
  models: Observable<any>

  usersCollection: AngularFirestoreCollection
  userdata: Observable<any>
  
  subcategoriescollection: AngularFirestoreCollection
  subcategorydata: Observable<any>

  userAds

  photos:any = []
  image: any
  photo: any
  caption: string
  fileImage

  imagename: string
  itemname: string
  price: number
  description: string
  postcategory = this.none
  postsubcategory = "none"
  postcondition = "none"
  usedperiod = "none"
  postbrand = "none"
  postmodel = "none"
  postlocation = "none"
  authorid: string
  authorname: any
  userpic

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  constructor(
    private router: Router, 
    private location: Location, 
    public camera: Camera, 
    public file:File,
    public afs: AngularFirestore,
    public user: UserService,
    private storage: AngularFireStorage,
    public alert: AlertController,
    public actionsheet: ActionSheetController,
    public categoryService: CategoriesService
    ) {

      this.postcategory = categoryService.getcreatesubcategory().category
      this.postsubcategory = categoryService.getcreatesubcategory().name

      this.authorid = this.user.getId()
      this.usersCollection = this.afs.collection('users')
      this.userdata = this.usersCollection.doc(this.authorid).valueChanges()
      this.userdata.subscribe((data) => {
      this.authorname = data.username
      this.userAds = data.ads
      this.userpic = data.picture
      })

      this.brandcollection = afs.collection('brands', ref =>ref.where('parent', '==', this.postsubcategory))
      this.brands = this.brandcollection.valueChanges()
      this.brands.subscribe((data) => {
        if(data.models != "none") {
          this.model = this.true
        } else {
          this.model = this.none
        }
      })

      try {
        this.authorid = user.getId()
        //this.userpic = user.getpicture()
        //console.log(this.authorid)
      } catch {
        this.router.navigate(['/menu/login'])
        this.showAlert("Login", "Login in order to sell")
      }
     }

  ngOnInit() {
    /*this.authorid = this.user.getId()
    this.usersCollection = this.afs.collection('users')
    this.userdata = this.usersCollection.doc(this.authorid).valueChanges()
    this.userdata.subscribe((data) => {
      this.authorname = data.username
      this.userAds = data.ads
    })*/
  }

  fileChanged(event) {
    const files = event.target.files[0]
    this.image = files

    console.log(event)
  }

  gohome() {
    this.router.navigate(['/menu/home'])
    //this.location.back()
  }

  takePicture() {
    try {
      var options: CameraOptions = {
        quality:50,
        mediaType:this.camera.MediaType.PICTURE,
        destinationType:this.camera.DestinationType.FILE_URI,
        encodingType:this.camera.EncodingType.JPEG,
        //targetWidth: 320,
        //targetHeight: 320,
        correctOrientation: true
      }
      const result = this.camera.getPicture(options)
      this.image = `data:image/jpeg;base64,${result}`;
      /*this.camera.getPicture(options).then((imagedata) => {
        //this.image = imagedata
        let filename = imagedata.substring(imagedata.lastIndexOf('/')+1);
        this.imagename = filename
        let path = imagedata.substring(0,imagedata.lastIndexOf('/')+1);
        this.image = `data:image/jpeg;base64,${imagedata}`;
        this.file.readAsDataURL(path, filename).then((base64data) => {
          this.photos.push(base64data);
          this.photo = base64data;
        })
      })*/
    } catch {
      this.fileChanged(event)
    }
  }

  postAd() {
    const image = this.image
    const itemname = this.itemname
    const description = this.description
    const price = this.price
    const seller = this.authorid
    const sellername = this.authorname
    const uniqname = this.afs.createId();

    const newAd = this.userAds + 1;

    //getting username
   
    //1.adding a post document to the post collection
    this.afs.collection('posts').doc(uniqname).set({
      postid: uniqname,
      category: this.postcategory,
      subcategory: this.postsubcategory,
      brand: this.postbrand,
      model: this.postmodel,
      condition: this.postcondition,
      usedperiod: this.usedperiod,
      location: this.postlocation,
      itemname: itemname,
      description: description,
      price: price,
      authorid: seller,
      authorname: sellername,
      authorpicture: this.userpic,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then((postref) => {
      //2.uploading the image file to firestore
      const filePath = 'posts/'+ this.user.getId()+'/' + uniqname /*+'_' + image.name this.imagename*/;
      const imageRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, image);

      // observe percentage changes
      this.uploadPercent = task.percentageChanges();
      // get notified when the download URL is available
      task.snapshotChanges().pipe(
          finalize(() => {
            this.downloadURL = imageRef.getDownloadURL()
            this.downloadURL.subscribe((url) => {
              console.log(url);
              this.afs.doc(`posts/${uniqname}`).update({
                picture: url
              }).then(() =>{
                //this.location.back()
                this.router.navigate(['/menu/home'])
              })
            })
          })
      ).subscribe()
    }).then(() => {
      this.afs.doc(`users/${seller}`).update({
        ads: newAd
      })
    })

  this.postcategory = this.none
  this.postsubcategory = "none"
  this.postcondition = "none"
  this.usedperiod = "none"
  this.postbrand = "none"
  this.postmodel = "none"
  this.postlocation = "none"

  }

  async getpicture() {
    const actionsheet = await this.actionsheet.create({
      header: "Select an image",
      buttons: [{
        text: "Take photo",
        handler: () => {
          this.takePicture()
        }
      },
      {
        text: "Select from Gallery",
        handler: () => {}
      },
      {
        text: "cancel",
        role: "cancel"
      }
    ]
    })
    await actionsheet.present()
  }

  

  async showAlert (header, message) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ["ok"]
    })

    await alert.present()
  }

  categories() {
    this.router.navigate(['/menu/createcategories'])
  }


}


  /*post() {
    const image = this.image
    const caption = this.caption 

    this.afs.doc(`users/${this.user.getId()}`).update({
      userPosts: firestore.FieldValue.arrayUnion(image)
    })

    this.afs.collection(`posts/${image}`).add({
      image,
      caption,
      likes: [],
      author: this.user.getUsername()
    })
    
    this.location.back()
  }*/

  /*
  postid: uniqname,
      itemname: itemname,
      description: description,
      price: price,
      authorid: seller,
      authorname: sellername,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
  */
