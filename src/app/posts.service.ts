import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Post {
  image,
  caption: string
}

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private postsCollection : AngularFirestoreCollection<Post>;

  private posts : Observable<Post[]>;

  constructor(afs: AngularFirestore) {
    this.postsCollection = afs.collection<Post>('Posts');

    this.posts = this.postsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return {id, ...data};
        })
      })
    )
   }

   getPosts() {
     return this.posts
   }

   postOwner(id) {
     return this.postsCollection.doc<Post>(id).valueChanges()
   }

   

}
