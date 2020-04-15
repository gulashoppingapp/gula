import { Injectable } from '@angular/core';

interface contact {
  id,
  name,
  picture
}

@Injectable({
  providedIn: 'root'
})
export class ViewcontactService {

  private contact: contact

  constructor() { }

  setcontact(contact: contact) {
    this.contact = contact
  }

  getContactId() {
    return this.contact.id
  }

  getContactName() {
    return this.contact.name
  }

  getContactpic() {
    return this.contact.picture
  }

}
