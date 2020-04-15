import { Injectable } from '@angular/core';

interface swap {
  swapitem: string,
  itemowner: string,
  itemownername: string,
  itempicture,
  itemprice,
  description: string
}

@Injectable({
  providedIn: 'root'
})
export class SwapService {

  private swap: swap

  constructor() { }

  setswap(swap: swap) {
    this.swap = swap
  }

  /*setSwapItem(item: string) {
    this.swap.swapitem = item 
  }

  setItemOwner(owner: string) {
    this.swap.itemowner = owner
  }*/

  getSwapItem() {
    return this.swap.swapitem
  }

  getItemOwner() {
    return this.swap.itemowner
  }

  getOwnerName() {
    return this.swap.itemownername
  }

  getItemPicture() {
    return this.swap.itempicture
  }

  getItemPrice() {
    return this.swap.itemprice
  }

  getDescription() {
    return this.swap.description
  }

}
