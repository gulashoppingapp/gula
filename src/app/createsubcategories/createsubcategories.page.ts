import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../categories.service';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-createsubcategories',
  templateUrl: './createsubcategories.page.html',
  styleUrls: ['./createsubcategories.page.scss'],
})
export class CreatesubcategoriesPage implements OnInit {

  categories: AngularFirestoreCollection
  categorycheck: Observable<any>

  categorycollection: AngularFirestoreCollection
  subcategories: Observable<any>

  category

  constructor(
    activeroute: ActivatedRoute,
    private router: Router,
    private location: Location,
    public categoryService: CategoriesService,
    public afs: AngularFirestore
  ) {
    //this.category = activeroute.snapshot.params["category"]
    this.category = categoryService.getcreatecategory().name
    console.log(this.category)

    this.categories = afs.collection('categories')
    this.categorycheck = this.categories.doc(this.category).valueChanges()
    this.categorycheck.subscribe((data) => {})

    this.categorycollection = afs.collection('subcategories', ref=> ref.where("parent", "==", this.category))
    this.subcategories = this.categorycollection.valueChanges()
   }

  ngOnInit() {
  }

  select(subcategory) {
    this.categoryService.setcreatesubcategory({
      category: this.category,
      name: subcategory
    })
    this.router.navigate(['/menu/createpost'])
  }

  back() {
    this.location.back()
  }

}
