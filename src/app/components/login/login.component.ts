import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashService: FlashMessagesService
  ) { }

  ngOnInit(): void {
    this.authService.getAuth().subscribe(auth=>{
      if(auth){
        this.router.navigate(['/'])
      }

    })
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
        this.flashService.show(err.message, {
          cssClass: 'alert-danger', timeout: 4000
        });
      });
    }

  
  }