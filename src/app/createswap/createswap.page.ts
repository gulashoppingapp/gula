import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from '../user.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { SwapService } from '../swap.service';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-createswap',
  templateUrl: './createswap.page.html',
  styleUrls: ['./createswap.page.scss'],
})
export class CreateswapPage implements OnInit {

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  usersCollection: AngularFirestoreCollection
  userdata: Observable<any>

  authorid: string
  authorname: string
  buyerpic

  itemname: any
  itemprice: number = 0
  itemdescription: string
  itemimage = "no"

  wanteditem: string
  wanteditemowner: string
  wanteditemownername: string

  imagename: string
  photos:any = []
  photo: any

  constructor(
    public user: UserService,
    private router: Router,
    public alert: AlertController,
    public swap: SwapService,
    public afs: AngularFirestore,
    private storage: AngularFireStorage,
    private location: Location,
    public camera: Camera,
    public file: File
  ) {
    try {
      this.authorid = user.getId()
      this.buyerpic = user.getpicture()
      this.wanteditem = swap.getSwapItem()
      this.wanteditemowner = swap.getItemOwner()
      this.wanteditemownername = swap.getOwnerName()

      console.log (this.wanteditem + '' + this.wanteditemowner + '' + this.authorid)
    } catch {
      this.router.navigate(['/menu/login'])
      this.showAlert("Login", "Login in order to sell")
    }
   }

  ngOnInit() {
    this.usersCollection = this.afs.collection('users')
    this.userdata = this.usersCollection.doc(this.authorid).valueChanges()
    this.userdata.subscribe((data) => {
      this.authorname = data.username
    })
  }

  fileChanged(event) {
    const files = event.target.files[0]
    this.itemimage = files

    console.log(event)
  }

  send() {
    const message = "wants to swap your "
    const agenda = "swap"
    const image = this.itemimage
    const id = this.afs.createId()
    
    //getting the username
    this.usersCollection = this.afs.collection('users')
    this.userdata = this.usersCollection.doc(this.authorid).valueChanges()
    this.userdata.subscribe((data) => {
      this.authorname = data.username
    }) 

    this.afs.collection('notifications').doc(id).set({
      notificationid: id,
      authorid: this.wanteditemowner,
      sellername: this.wanteditemownername,
      price: this.itemprice,
      description: this.itemdescription,
      agenda: agenda,
      message: message,
      itemname: this.wanteditem,
      buyerid: this.authorid,
      buyername: this.authorname,
      buyerpicture: this.buyerpic,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then((postref) => {
      //2.uploading the image file to firestore
      const uniqname = this.afs.createId();
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
              this.afs.doc(`notifications/${id}`).update({
                picture: url
              }).then(() =>{this.location.back()})
            })
          })
      ).subscribe()
    })
  }

  takePicture() {
    var options: CameraOptions = {
      quality:50,
      mediaType:this.camera.MediaType.PICTURE,
      destinationType:this.camera.DestinationType.FILE_URI,
      encodingType:this.camera.EncodingType.JPEG,
      //targetWidth: 320,
      //targetHeight: 320,
      correctOrientation: true
    }
    this.camera.getPicture(options).then((imagedata) => {
      //this.image = imagedata
      let filename = imagedata.substring(imagedata.lastIndexOf('/')+1);
      this.imagename = filename
      let path = imagedata.substring(0,imagedata.lastIndexOf('/')+1);
      this.itemimage = 'data:image/jpeg;base64,' + imagedata;
      this.file.readAsDataURL(path, filename).then((base64data) => {
        this.photos.push(base64data);
        this.photo = base64data;
      })
    })
  }

  goback() {
    this.location.back()
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
