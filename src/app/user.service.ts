import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';

interface user{
    uid: string,
    email: string,
    username: string,
    picture
}

@Injectable()
export class UserService{
    private user: user

    constructor (public afauth: AngularFireAuth) {}

    setUser(user: user) {
        this.user = user
    }

    /*removeUser() {
        delete this.user
        this.afauth.auth.signOut()
    }*/

    getUsername():string {
        return this.user.username
    }

    getId() {
        return this.user.uid
    }

    getpicture() {
        return this.user.picture
    }

    async isAuthenticated() {
        if (this.user) return true

        const user = await this.afauth.authState.pipe(first()).toPromise()

        if ( user ) {
            this.setUser({
                uid: user.uid,
                email: user.email,
                username: user.email,
                picture: user.email
            })

            return true
        }
        return false
    }

}