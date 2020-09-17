import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(

    private router: Router,
    private afAuth: AngularFireAuth
  ){

  }

  canActivate():Observable<boolean>{
    return this.afAuth.authState.pipe(map(auth =>{
      if(!auth){
        this.router.navigate(['/login']);
        return false;
      }
      else { return true;
      }
    }))
  };


}