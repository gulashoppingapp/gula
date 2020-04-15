import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.page.html',
  styleUrls: ['./audio.page.scss'],
})
export class AudioPage implements OnInit {

  constructor(
    private location: Location
  ) { }

  ngOnInit() {
  }

  goback() {
    this.location.back()
  }

}
