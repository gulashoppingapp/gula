import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CategoriesService } from '../categories.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-createcategories',
  templateUrl: './createcategories.page.html',
  styleUrls: ['./createcategories.page.scss'],
})
export class CreatecategoriesPage implements OnInit {

  none = "none"

  categoriesCollection: AngularFirestoreCollection;
  categoriesList: Observable<any>

  constructor(
    public afs: AngularFirestore,
    public categoryService: CategoriesService,
    private router: Router,
    private location: Location
  ) {
    this.categoriesCollection = afs.collection('categories')
    this.categoriesList = this.categoriesCollection.valueChanges()
   }

  ngOnInit() {
  }

  select(name, subcategories) {
    if(subcategories == this.none) {
      this.categoryService.setcreatesubcategory({
        category: name,
        name: this.none
      })
      this.router.navigate(['/menu/createpost'])
    } else {
      this.categoryService.setcreatecategory({
        name: name
      })
      this.router.navigate(['/menu/createsubcategories'])
    }
  }

  back() {
    this.location.back()
  }

}
