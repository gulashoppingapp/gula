import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CategoriesService } from '../categories.service';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  none= "none"

  categoriesCollection: AngularFirestoreCollection;
  categories: Observable<any>

  constructor(
    private router: Router,
    private location: Location,
    public categoryService: CategoriesService,
    public afs: AngularFirestore
  ) {
    this.categoriesCollection = afs.collection('categories')
    this.categories = this.categoriesCollection.valueChanges()
   }

  ngOnInit() {
  }

  back() {
    this.location.back()
  }

  set(catergory) {
    this.categoryService.setcategory(catergory)
  }

  select(name, subcategory) {
    if(subcategory == this.none) {
      this.categoryService.setsubcategory({
        category: name,
        name: this.none
      })
      this.router.navigate(['/menu/home'])
    } else {
      this.categoryService.setcategory({
        name: name
      })
      this.router.navigate(['/menu/subcategories'])
    }
  }

}
