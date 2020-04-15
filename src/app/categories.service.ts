import { Injectable } from '@angular/core';

interface category {
  name
}

interface subcategory {
  category,
  name
}

interface createCategory {
  name
}

interface createsubcategory {
  category,
  name
}

interface filter {
  brand,
  model,
  pricemin,
  pricemax,
  condition,
  usedperiod,
  location,
  from,
  aquire,
}

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private category
  private subcategory: subcategory = {
    category: "none",
    name: "none"
  }

  private createcategory: createCategory
  
  private createsubcategory: createsubcategory = {
    category: "none",
    name: "none"
  }

  private filter: filter = {
    brand: "none",
    model: "none",
    pricemin: 0,
    pricemax: 0,
    condition: "none",
    usedperiod: "none",
    location: "none",
    from: "none",
    aquire: "none"
  }

  constructor() { }

  setcategory(category) {
    this.category = category
  }

  getCategory() {
    return this.category
  }

  setsubcategory(subcategory: subcategory) {
    this.subcategory = subcategory
  }

  getsubcategory() {
    return this.subcategory
  }

  setcreatecategory(category: createCategory) {
    this.createcategory = category
  }

  getcreatecategory() {
    return this.createcategory
  }

  setcreatesubcategory(subcategory: createsubcategory) {
    this.createsubcategory = subcategory
  }

  getcreatesubcategory() {
    return this.createsubcategory
  }

  deletesubcategory() {
    this.setsubcategory({
      category: "none",
      name: "none"
    })
  }

  deletecreatedsubcategory() {
    this.setcreatesubcategory({
      category: "none",
      name: "none"
    })
  }

  setFilter(filters: filter) {
    this.filter = filters
  }

  getFilter() {
    return this.filter
  }

  clearFilters() {
    this.filter = {
      brand: "none",
      model: "none",
      pricemin: 0,
      pricemax: 0,
      condition: "none",
      usedperiod: "none",
      location: "none",
      from: "none",
      aquire: "none"
    }
  }

}
