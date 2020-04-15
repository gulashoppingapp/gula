import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../categories.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.page.html',
  styleUrls: ['./subcategories.page.scss'],
})
export class SubcategoriesPage implements OnInit {

  subcategorycollection: AngularFirestoreCollection;
  subcategories: Observable<any>

  category

  constructor(
    activeroute: ActivatedRoute,
    private router: Router,
    public categoryservice: CategoriesService,
    public afs: AngularFirestore,
    private location: Location
  ) {
    //this.category = activeroute.snapshot.params["category"];
    this.category = categoryservice.getCategory().name
    console.log(this.category)

    this.subcategorycollection = afs.collection('subcategories', ref =>
     ref.where('parent', '==', this.category))
    this.subcategories = this.subcategorycollection.valueChanges()
   }

  ngOnInit() {
  }

  back() {
    this.location.back()
  }

  select(subcategory) {
    this.categoryservice.setsubcategory({
      category: this.category,
      name: subcategory
    })
    this.categoryservice.clearFilters()
    this.router.navigate(['/menu/home'])
  }
}
