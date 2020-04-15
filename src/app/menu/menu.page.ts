import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from '../user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  pages: [
    {
      title: 'settings',
      url: 'menu/settings',
      icon: 'settings'
    }
  ];

  selectedPath = '';

  constructor(private router: Router, private menuCtrl: MenuController, public user: UserService) { 
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    })
  }

  ngOnInit() {
  }

  goToSettings() {
    this.menuCtrl.close();
    this.router.navigate(['/menu/settings'])
  }

  logout() {
    this.router.navigate(['/menu/login'])
    this.menuCtrl.close();
  }

  home() {
    this.menuCtrl.close();
    this.router.navigate(['/menu/home'])
  }

  categories() {
    this.menuCtrl.close()
    this.router.navigate(['/menu/categories'])
  }

  account() {
    this.menuCtrl.close();
    this.router.navigate(['/menu/account'])
  }

  favorites() {
    this.menuCtrl.close();
    this.router.navigate(['/menu/favorites'])
  }

  about() {
    this.menuCtrl.close();
    this.router.navigate(['/menu/about'])
  }

  help() {
    this.router.navigate(['/menu/help'])
  }

}
