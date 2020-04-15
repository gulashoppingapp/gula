import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CategoriesService } from '../categories.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {

  categorycollection: AngularFirestoreCollection;
  selectedcategory: Observable<any>
  category
  subcategory

  brand
  model
  pricemin
  pricemax
  condition
  usedperiod
  adlocation
  vendortype
  aquiretype


  constructor(
    private location: Location,
    public afs: AngularFirestore,
    public categoryservice: CategoriesService
  ) {
    this.category = categoryservice.getsubcategory().category
    this.subcategory = categoryservice.getsubcategory().name
   }

  ngOnInit() {
  }

  goback() {
    this.location.back()
  }

  set() {
  }

}
