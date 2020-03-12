import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(
    private router: Router,
    private location: Location
    ) { }

  ngOnInit() {
  }

  goback() {
    //this.router.navigate(['/menu/home'])
    this.location.back()
  }
}
