import { Injectable } from '@angular/core';

interface data {
  buyerid,
  buyername,
  buyerpic,
  picture,
  itemname,
  itemprice,
  description
}

@Injectable({
  providedIn: 'root'
})
export class ViewswapService {

  private data: data

  constructor() { }

  setData( data: data) {
    this.data = data
  }

  getBuyerid() {
    return this.data.buyerid
  }

  getBuyername() {
    return this.data.buyername
  }

  getPicture() {
    return this.data.picture
  }

  getItemname() {
    return this.data.itemname
  }

  getItemprice() {
    return this.data.itemprice
  }

  getDescription() {
    return this.data.description
  }

  getBuyerPicture() {
    return this.data.buyerpic
  }
}
