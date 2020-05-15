import { Client } from './../models/client';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clientsCollection: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client: Observable<Client>;
  lastName: AngularFirestoreCollection<Client>;


  constructor(private afs: AngularFirestore) {
    this.clientsCollection = this.afs.collection('clients',
      ref => ref.orderBy('lastName', 'asc'))

  }
  getClients(): Observable<Client[]> {
    // Get client with the id
    this.clients = this.clientsCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Client;
          data.id = action.payload.doc.id;
          console.log("The data--------------------->", data);
          return data

        });
      }));
    return this.clients;
  }

  newClient(client: Client) {
    this.clientsCollection.add(client);
  }


  getLastName() {
    // Get client with the id
    this.clientsCollection.doc('7vJhURfWoNYu7xfxF8Cm').collection;

    console.log("Last Name", this.clientsCollection);

  }


  getClient(id: string): Observable<Client> {
    this.clientDoc = this.afs.doc<Client>(`clients/${id}`);
    this.client = this.clientDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        console.log("return NULL---------------------->");
        return null;
      } else {
        const data = action.payload.data() as Client;
        data.id = action.payload.id;
        return data;
      }

    }));
    return this.client;

  }

  updateClient(client:Client){
    this.clientDoc = this.afs.doc(`clients/${client.id}`);
    this.clientDoc.update(client);
  }

  deleteClient(client:Client){
    this.clientDoc = this.afs.doc(`clients/${client.id}`);
    this.clientDoc.delete();
  }

}

/*


export class AppComponent {
  private shirtCollection: AngularFirestoreCollection<Shirt>;
  shirts: Observable<ShirtId[]>;
  constructor(private readonly afs: AngularFirestore) {
    this.shirtCollection = afs.collection<Shirt>('shirts');
    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.
    this.shirts = this.shirtCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Shirt;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
}*/
