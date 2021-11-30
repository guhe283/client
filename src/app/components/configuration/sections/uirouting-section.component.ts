import {Component, OnDestroy, OnInit} from '@angular/core';

import {Router} from '@angular/router';


import {Subscription} from 'rxjs';


@Component({
    selector: 'app-uirouting-section',
    templateUrl: './uirouting-section.component.html',
    styleUrls: ['./uirouting-section.component.scss']

})
export class UiroutingSectionComponent implements OnInit {

    private userConfigSubscription: Subscription;



    public preferenceType = 'UI_SETTING';
    public preferenceKeyIntercom = 'ROUTING_INTERCOM';

    constructor(
        
        private router: Router
    
    ) {
    }

    ngOnInit(): void {

       
    }

   

            
    
    
}

