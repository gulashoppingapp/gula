import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-passwordchange',
  templateUrl: './passwordchange.page.html',
  styleUrls: ['./passwordchange.page.scss'],
})
export class PasswordchangePage implements OnInit {

  constructor(
    private location: Location,
    private router: Router
  ) { 
  }

  ngOnInit() {
  }

  back() {
    this.location.back()
  }

}
