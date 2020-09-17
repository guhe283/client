import { Invest } from '../models/invest';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvestService {
  investsCollection: AngularFirestoreCollection<Invest>;
  investDoc: AngularFirestoreDocument<Invest>;
  invests: Observable<Invest[]>;
  invest: Observable<Invest>;
  date: AngularFirestoreCollection<Invest>;


  constructor(private afs: AngularFirestore) {
    this.investsCollection = this.afs.collection('invests',
      ref => ref.orderBy('date', 'asc'))

  }
  getInvests(): Observable<Invest[]> {
    // Get client with the id
    this.invests = this.investsCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Invest;
          data.id = action.payload.doc.id;
          console.log("The data--------------------->", data);
          return data

        });
      }));
    return this.invests;
  }

  newInvest(invest: Invest) {
    this.investsCollection.add(invest);
  }


  getInvest(id: string): Observable<Invest> {
    this.investDoc = this.afs.doc<Invest>(`stocks/${id}`);
    this.invest = this.investDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        console.log("return NULL---------------------->");
        return null;
      } else {
        const data = action.payload.data() as Invest;
        data.id = action.payload.id;
        return data;
      }

    }));
    return this.invest;

  }

  updateInvest(invest:Invest){
    this.investDoc = this.afs.doc(`invests/${invest.id}`);
    this.investDoc.update(invest);
  }

  deleteInvest(invest:Invest){
    this.investDoc = this.afs.doc(`invests/${invest.id}`);
    this.investDoc.delete();
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
