import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController} from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { UserService } from '../user.service';
import { stringify } from 'querystring';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = ""
  password: string= ""
  
  constructor(
    public afAuth: AngularFireAuth, 
    private router: Router, 
    public alert: AlertController, 
    public user: UserService,
    private location: Location
    ) { }

  ngOnInit() {
  }

  async login() {
    const {email, password} = this
    try {
      const res = await this.afAuth.auth.signInWithEmailAndPassword(email, password)
      console.log(res)
      this.showAlert("Success", "You're logged in")
      if (res.user) {
        this.user.setUser({
          email,
          uid: res.user.uid,
          username: res.user.displayName
        })
        this.router.navigate(['/menu/home'])
        //this.location.back()
      }
    }catch(err){
      console.dir(err)
      this.showAlert("Error", err.code)
      if (err.code === "auth/user-not-found") {
        console.log("user not found")
      }
    }
  }

  goToSignup() {
    this.router.navigate(['/menu/signup'])
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
