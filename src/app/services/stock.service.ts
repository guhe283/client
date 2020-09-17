import { Stock } from '../models/stock';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  stocksCollection: AngularFirestoreCollection<Stock>;
  stockDoc: AngularFirestoreDocument<Stock>;
  stocks: Observable<Stock[]>;
  stock: Observable<Stock>;
  name: AngularFirestoreCollection<Stock>;


  constructor(private afs: AngularFirestore) {
    this.stocksCollection = this.afs.collection('stocks',
      ref => ref.orderBy('name', 'asc'))

  }
  getStocks(): Observable<Stock[]> {
    // Get client with the id
    this.stocks = this.stocksCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Stock;
          data.id = action.payload.doc.id;
          console.log("The data--------------------->", data);
          return data

        });
      }));
    return this.stocks;
  }

  newStock(stock: Stock) {
    this.stocksCollection.add(stock);
  }


  getStock(id: string): Observable<Stock> {
    this.stockDoc = this.afs.doc<Stock>(`stocks/${id}`);
    this.stock = this.stockDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        console.log("return NULL---------------------->");
        return null;
      } else {
        const data = action.payload.data() as Stock;
        data.id = action.payload.id;
        return data;
      }

    }));
    return this.stock;

  }

  updateStock(stock:Stock){
    this.stockDoc = this.afs.doc(`stocks/${stock.id}`);
    this.stockDoc.update(stock);
  }

  deleteStock(stock:Stock){
    this.stockDoc = this.afs.doc(`stocks/${stock.id}`);
    this.stockDoc.delete();
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
