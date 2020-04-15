import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController} from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { UserService } from '../user.service';
import { stringify } from 'querystring';
import { Location } from '@angular/common';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  a = "test"
  b

  userscollection: AngularFirestoreCollection;
  picture

  userdata: Observable<any>;

  email: string = ""
  password: string= ""

  username: string
  
  constructor(
    public afAuth: AngularFireAuth, 
    private router: Router, 
    public alert: AlertController, 
    public user: UserService,
    private location: Location,
    public afs: AngularFirestore
    ) {
      this.userscollection = afs.collection('users')
     }

  ngOnInit() {
  }

  async login() {
    const {email, password} = this
    this.userscollection = this.afs.collection('users')
    try {
      const res = await this.afAuth.auth.signInWithEmailAndPassword(email, password)

      this.userdata = this.userscollection.doc(res.user.uid).valueChanges()
      this.userdata.subscribe((data) => {
        this.username = data.username
        this.picture = data.picture
      })

      console.log(res)
      console.log(this.username)
      this.showAlert("Success", "You're logged in")
      if (res.user) {
        this.user.setUser({
          email,
          uid: res.user.uid,
          username: this.username,
          picture: this.picture
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

  async elogin() {
    const email = this.email
    const password = this.password

    /*this.b = this.a
    this.a = ""
    console.log(this.b)*/
    
    try {
      await this.afAuth.auth.signInWithEmailAndPassword(email, password).then((res) => {
        console.log(res)
        this.userdata = this.userscollection.doc(res.user.uid).valueChanges()
        this.userdata.subscribe((data) => {
          this.username = data.username
          this.picture = data.picture
          console.log(this.username+ " "+ this.picture)
        })
        this.user.setUser({
          email,
          uid: res.user.uid,
          username: this.username,
          picture: this.picture
        })
        this.showAlert("Success", "You're logged in")
        this.router.navigate(['/menu/home'])
      })
    } catch(err){
      console.dir(err)
      //this.showAlert("Error", err.code)
      if (err.code === "auth/user-not-found") {
        console.log("user not found")
        this.showAlert("Error", "Register first")
      } else {
        this.showAlert("Error", "Check Internet Connection")
        console.log("Check Internet Connection")
      }
    }
  }

}


      /*this.userscollection = this.afs.collection('users')
      this.userdata = this.userscollection.doc(res.user.uid).valueChanges();

      var username = "";
      this.userdata.subscribe((data) => {
        console.log(data)
        username = data.username
      })*/

