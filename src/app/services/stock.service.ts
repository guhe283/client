import { Stock } from './../models/stock';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/*
 overviewDoc: AngularFirestoreDocument<Overview>;
  overviews: Observable<Overview[]>;
  overview: Observable<Overview>;
*/
export class StockService {
  stocksCollection: AngularFirestoreCollection<Stock>;
  stockDoc: AngularFirestoreDocument<Stock>;
  collection: AngularFirestoreCollection<Stock>
  stocks: Observable<Stock[]>;
  stock: Observable<Stock>;
  name: AngularFirestoreCollection<Stock>;
  notes: Observable<Stock>;


  constructor(private afs: AngularFirestore) {
    this.stocksCollection = this.afs.collection('stocks',
      ref => ref.orderBy('name', 'asc'))
    console.log("Database---------------------------", this.stocksCollection)
    this.stocks = this.stocksCollection.valueChanges();

  }
  getStocks(): Observable<Stock[]> {


    // Get client with the id
    this.stocks = this.stocksCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Stock;
          data.id = action.payload.doc.id;
          console.log("StockService The data GET STOCK--------------------->", data);
          return data

        });
      }));
    return this.stocks;
  }
/*
  getIsin(){

 this.afs.collection('stocks', ref =>{
  console.log("My Query--------------------->>>>>>>>>>>>>>>>>>",ref.where('isin','==', 'LU0274208692'));
      return ref.where('isin','==', 'yyyyyyLU0274208692');
    
    }
    )
  }*/
  

  getOverview(id: string): Observable<Stock> {
    this.stockDoc = this.afs.doc<Stock>(`stocks/${id}`);
    this.stock = this.stockDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        console.log("return NULL---------------------->");
        return null;
      } else {
        const data = action.payload.data() as Stock;
        data.id = action.payload.id;
        console.log("PAYLOAD---------------------->", data);
        return data;
      }

    }));
    return this.stock;

  }


  newStock(stock: Stock) {
    this.stocksCollection.add(stock);
  }


  getStock(id: string): Observable<Stock> {
    this.stockDoc = this.afs.doc<Stock>(`stocks/${id}`);
    this.stock = this.stockDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        console.log("StockService, no payload---------------------->");
        return null;
      } else {
        const data = action.payload.data() as Stock;
        data.id = action.payload.id;
        return data;
      }

    }));
    return this.stock;

  


   

    /*
    this.stockDoc = this.afs.doc<Stock>(`stocks/isin/${id}`);
    this.stock = this.stockDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        console.log("StockService, no payload---------------------->");
        return null;
      } else {
        const data = action.payload.data() as Stock;
        data.id = action.payload.id;
        return data;
      }

    }));*/
    

  }

  /*
getOverview(id: string): Observable<Overview> {
    this.overviewDoc = this.afs.doc<Overview>(`overviews/${id}`);
    this.overview = this.overviewDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        console.log("return NULL---------------------->");
        return null;
      } else {
        const data = action.payload.data() as Overview;
        data.id = action.payload.id;
        return data;
      }

    }));
    return this.overview;

  }

  updateOverview(overview:Overview){
    this.overviewDoc = this.afs.doc(`overviews/${overview.id}`);
    this.overviewDoc.update(overview);
  }

  deleteOverview(overview:Overview){
    this.overviewDoc = this.afs.doc(`overviews/${overview.id}`);
    this.overviewDoc.delete();
  }
  
*/

  updateStock(stock: Stock) {
    this.stockDoc = this.afs.doc(`stocks/${stock.id}`);
    this.stockDoc.update(stock);
  }

  deleteStock(stock: Stock) {
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
