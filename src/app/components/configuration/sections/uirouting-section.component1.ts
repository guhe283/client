import {Component, OnDestroy, OnInit} from '@angular/core';

import {Router} from '@angular/router';


import {Subscription} from 'rxjs';


@Component({
    selector: 'app-uirouting-section1',
    templateUrl: './uirouting-section.component1.html',
    styleUrls: ['./uirouting-section.component1.scss']

})
export class UiroutingSectionComponent1 implements OnInit {

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

