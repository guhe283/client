import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashService: FlashMessagesService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.register(this.email, this.password)
      .then(res => {
        this.flashService.show('You are now registerd and logged in',
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
