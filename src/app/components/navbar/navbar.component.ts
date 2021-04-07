import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from '../../models/client';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { MegaMenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component3.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean;
  loggedInUser: string;
  showRegister: boolean;
  public items: MenuItem[];

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit(): void {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      } else {
        this.isLoggedIn = false;
      }

    });
    this.items = [
      {
        label: 'Overview',
        icon: 'pi pi-money-bill',
        routerLink: ['/overview'],
        routerLinkActiveOptions: {
          exact: true
        },
        styleClass: 'menucus'

      },
      {
        label: 'Stocks',
        icon: 'pi pi-info',
        routerLink: ['/stock'],
        routerLinkActiveOptions: {
          exact: true
        },
        styleClass: 'menucus'

      },
      {
        label: 'Invests',
        icon: 'pi pi-euro',
        routerLink: ['/invest'],
        routerLinkActiveOptions: {
          exact: true
        },
        styleClass: 'menucus'

      },
      {
        label: 'Linechart',
        icon: 'pi pi-chart-line',
        routerLink: ['/linechart'],
        routerLinkActiveOptions: {
          exact: true
        },
        styleClass: 'menucus'

      },
      {
        label: 'GPIO',
        icon: 'pi pi-android',
        routerLink: ['/gpio'],
        routerLinkActiveOptions: {
          exact: true
        },
        styleClass: 'menucus'

      },
      {
        label: 'Telegram',
        icon: 'pi pi-envelope',
        routerLink: ['/telegram'],
        routerLinkActiveOptions: {
          exact: true
        },
        styleClass: 'menucus'

      },
      {
        label: 'Django',
        icon: 'pi pi-eye',
        routerLink: ['/django'],
        routerLinkActiveOptions: {
          exact: true
        },
        styleClass: 'menucus'

      },
      {
        label: 'Salesman',
        icon: 'pi pi-eye',
        routerLink: ['/salesman'],
        routerLinkActiveOptions: {
          exact: true
        },
        styleClass: 'menucus'

      },
      {
        label: 'Paypal',
        icon: 'pi pi-eye',
        routerLink: ['/paypal'],
        routerLinkActiveOptions: {
          exact: true
        },
        styleClass: 'menucus'

      },
      {
        label: 'Settings',
        icon: 'pi pi-fw pi-cog',
        styleClass: 'menucus',

        items: [

          {
            label: 'Login',
            icon: 'pi pi-fw pi-sign-in',
            routerLink: ['/login'],
            routerLinkActiveOptions: {
              exact: true
            },
            styleClass: 'menucus'

          },
          {
            label: 'Register',
            icon: 'pi pi-fw pi-users',
            routerLink: ['/register'],
            routerLinkActiveOptions: {
              exact: true
            },
            styleClass: 'menucus'

          },

          {
            label: 'Logout',
            icon: 'pi pi-fw pi-sign-out',
            routerLink: ['/logout'],
            routerLinkActiveOptions: {
              exact: true
            },
            styleClass: 'menucus'
          },

        ]
      },

    ];


  }

  onLogoutClick() {
    this.authService.logout();
    this.flashMessage.show('You arelogged out', {
      cssClass: 'alert-success', timeout: 4000
    });
    this.router.navigate(['/login']);

  }






}
