import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.page.html',
  styleUrls: ['./testing.page.scss'],
})
export class TestingPage implements OnInit {

  no = "no"
  yes = "yes"
  changed = this.yes

  picture = "";
  username = "";
  userlocation = "";
  biography = "";
  mobilenumber = "";

  constructor(
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
  }

  save() {}

  passwordchange() {
    this.router.navigate(['/menu/passwordchange'])
  }

}
