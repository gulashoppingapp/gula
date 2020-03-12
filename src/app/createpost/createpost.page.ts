import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { firestore } from 'firebase/app';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.page.html',
  styleUrls: ['./createpost.page.scss'],
})
export class CreatepostPage implements OnInit {

  usersCollection: AngularFirestoreCollection
  userdata: Observable<any>

  photos:any = []
  image: any
  photo: any
  caption: string
  fileImage

  imagename: string
  itemname: string
  price: number
  description: string
  authorid: string
  //authorname: any

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
    public actionsheet: ActionSheetController
    ) {
      try {
        this.authorid = user.getId()
        //console.log(this.authorid)
      } catch {
        this.router.navigate(['/menu/login'])
        this.showAlert("Login", "Login in order to sell")
      }
     }

  ngOnInit() {
  }

  fileChanged(event) {
    const files = event.target.files[0]
    this.image = files

    console.log(event)
  }

  gohome() {
    //this.router.navigate(['/'])
    this.location.back()
  }


  post() {
    const image = this.image
    const itemname = this.itemname
    const description = this.description
    const price = this.price
    const seller = this.authorid

    //getting username
   
    //1.adding a post document to the post collection
    this.afs.collection('posts').add({
      itemname: itemname,
      description: description,
      price: price,
      authorid: seller
    }).then((postref) => {
      //2.uploading the image file to firestore
      const uniqname = this.afs.createId();
      const filePath = 'posts/'+ this.user.getId()+'/' + uniqname +'_' + /*image.name*/ this.imagename;
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
              this.afs.doc(postref.path).update({
                picture: url
              }).then(() =>{this.location.back()})
            })
          })
      ).subscribe()
    })
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
      this.image = path
      this.file.readAsDataURL(path, filename).then((base64data) => {
        this.photos.push(base64data);
        this.photo = base64data;
      })
    })
  }

  async showAlert (header, message) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ["ok"]
    })

    await alert.present()
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
