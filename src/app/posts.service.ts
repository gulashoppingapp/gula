import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Post {
  picture,
  itemname,
  price,
  description,
  sellername,
  sellerid,
  sellerpic,
  timestamp
}

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private postsCollection : AngularFirestoreCollection<Post>;

  private post: Post

  constructor(afs: AngularFirestore) { }

  setPost(post: Post) {
    this.post = post
  }

   getPost() {
     return this.post
   }

   getPostOwnername() {
     return this.post.sellername
   }

   getPostOwnerid() {
    return this.post.sellerid
   }

   getPostDescription() {
     return this.post.description
   }

   getPostPrice() {
     return this.post.price
   }

   getPostPicture() {
     return this.post.picture
   }

   getPostTimestamp() {
     return this.post.timestamp
   }

   getPostname() {
     return this.post.itemname
   }

   getPostOwnerPicture() {
     return this.post.sellerpic
   }

   

}
