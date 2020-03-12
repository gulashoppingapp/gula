import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-createswap',
  templateUrl: './createswap.page.html',
  styleUrls: ['./createswap.page.scss'],
})
export class CreateswapPage implements OnInit {

  authorid: string

  constructor(
    public user: UserService,
    private router: Router,
    public alert: AlertController
  ) {
    try {
      this.authorid = user.getId()
    } catch {
      this.router.navigate(['/menu/login'])
      this.showAlert("Login", "Login in order to sell")
    }
   }

  ngOnInit() {
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
