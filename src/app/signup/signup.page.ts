import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController} from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth } from 'firebase/app';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  email: string 
  username: string 
  password: string
  cpassword: string
  picture = "https://firebasestorage.googleapis.com/v0/b/turnapp-cf852.appspot.com/o/bp.png?alt=media&token=ca3841e0-04c7-41c6-821d-8062780a8776"

  constructor(public afAuth: AngularFireAuth, private router: Router, public alert: AlertController,
     public afstore: AngularFirestore,
     public user: UserService
     ) { }

  ngOnInit() {
  }

  async register() {
    const {email, username, password, cpassword, picture} = this
    var ads = 0
    var location = "none"
    var messages = 0
    var notifications = 0
    var phone = "none"
    var rating = 1
    var trustedby = 1
    var sold = "none"
    var interests = "none"
    if (cpassword !== password) {
      return console.error("Passwords don't match");
      this.showAlert("Error", "Your passwords don't match")
    }
    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      console.log(res)

      this.afstore.doc(`users/${res.user.uid}`).set({
        email,
        username,
        picture,
        ads: ads,
        location: location,
        messages: messages,
        notifications: notifications,
        phone: phone,
        rating: rating,
        trustedby: trustedby,
        soldcategories: sold,
        interests: interests,
        type: "vendor"
      }).then(() => {
        this.user.setUser({
          email: email,
          uid: res.user.uid,
          username: username,
          picture: picture
        })
      })

      
      this.router.navigate(['/menu/home'])
      this.showAlert("Success", "You've successfully created an account")
    } catch (err) {
      console.dir(err)
      this.showAlert("Error", err.message)
    }
  }

  goToLogin() {
    this.router.navigate(['/menu/login'])
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
