import { Overview } from '../models/overview';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Timestamp } from 'rxjs/internal/operators/timestamp';

@Injectable({
  providedIn: 'root'
})
export class OverviewService {
  overviewsCollection: AngularFirestoreCollection<Overview>;
  overviewDoc: AngularFirestoreDocument<Overview>;
  overviews: Observable<Overview[]>;
  overview: Observable<Overview>;
  date: AngularFirestoreCollection<Overview>;


  constructor(private afs: AngularFirestore) {
    this.overviewsCollection = this.afs.collection('overviews',
      ref => ref.orderBy('date', 'asc'))

  }
  getOverviews(): Observable<Overview[]> {
    // Get client with the id
    this.overviews = this.overviewsCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Overview;
          data.id = action.payload.doc.id;
          console.log("The overview service data: --------------------->", data);
          return data

        });
      }));
    return this.overviews;
  }

  newOverview(overview: Overview) {
    this.overviewsCollection.add(overview);
  }


  


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

 /* getOverviewDate(id: string): Observable<Overview> {
    this.overviewDoc = this.afs.doc<Overview>(`overviews/${id}`);
    this.overview = this.overviewDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        console.log("return NULL---------------------->");
        return null;
      } else {
        var data = action.payload.data() as Overview;
        data.id = action.payload.id;

        data = action.payload.data() as any;
        console.log("data------------------------------------------------>",action.payload.data)
                    Object.keys(data).filter(key => data["date"] instanceof Timestamp)
                    
                        .forEach(key => data["data"] = data["date"].toDate())
                    data.date = action.payload.id;
                    console.log("DATE___________________________________--------------------------------",data)
                    return data;

        return data;
      }

    }));
    return this.overview;

  }*/

  updateOverview(overview:Overview){
    this.overviewDoc = this.afs.doc(`overviews/${overview.id}`);
    this.overviewDoc.update(overview);
  }

  deleteOverview(overview:Overview){
    this.overviewDoc = this.afs.doc(`overviews/${overview.id}`);
    this.overviewDoc.delete();
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
