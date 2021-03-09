import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

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
    //this.authService.logout();
    this.authService.logout()
    {
      this.flashService.show('You are now logged out',
        {
          cssClass: 'alert-success', timeout: 4000
        });
      this.router.navigate(['/']);
    }


  }

}