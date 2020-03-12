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

  constructor(public afAuth: AngularFireAuth, private router: Router, public alert: AlertController,
     public afstore: AngularFirestore,
     public user: UserService
     ) { }

  ngOnInit() {
  }

  async register() {
    const {email, username, password, cpassword} = this
    if (cpassword !== password) {
      return console.error("Passwords don't match");
      this.showAlert("Error", "Your passwords don't match")
    }
    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      console.log(res)

      this.afstore.doc(`users/${res.user.uid}`).set({
        email,
        username
      })

      this.user.setUser({
        email,
        uid: res.user.uid,
        username

      })
      this.router.navigate(['/menu/home'])
      this.showAlert("Success", "You successfully created an account")
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
