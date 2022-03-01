import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AlertComponent } from '../shared/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error: string = '';


  email: string;
  password: string;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  private closeSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashService: FlashMessagesService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.router.navigate(['/'])
      }

    });
  }

  ngOnDestroy(){
    if(this.closeSub){
      this.closeSub.unsubscribe();
    }
  }
  onSubmit() {
    this.authService.login(this.email, this.password)
      .then(res => {
        this.flashService.show('You are now logged in',
          {
            cssClass: 'alert-success', timeout: 4000
          });
        this.router.navigate(['/']);
      })
      .catch(err => {
        console.log('--------------------------------error message', this.error)
        this.error = err.message;


        console.log('--------------------------------error message', this.error);
        console.log('--------------------------------error message', this.error);
        this.showErrorAlert(err.message);
        this.flashService.show(err.message, {
          cssClass: 'alert-danger', timeout: 4000
        });
      });
  }
  onHandleError() {
    this.error = null;
  }

  private showErrorAlert(message: string) {

    console.log('--------------------------------error message---5', message);
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const compnentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    compnentRef.instance.message = message;
    this.closeSub = compnentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
  
    }
    );

  }



}
