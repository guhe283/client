
import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from '../../models/client';


@Component({
  selector: 'app-details-client',
  templateUrl: './details-client.component.html',
  styleUrls: ['./details-client.component.css']
})
export class DetailsClientComponent implements OnInit {
  id: string;
  client: Client;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService

  ) { }

  ngOnInit() {
    console.log("ngOnInit executed");
    // Get id from url
    this.id = this.route.snapshot.params['id'];
    // Get client
    this.clientService.getClient(this.id).subscribe(client => {
      if (client != null) {
        if (client.balance > 0) {
          this.hasBalance = true;
        }
      }
      this.client = client;
      console.log(this.client);
    });
  }

  onDeleteClick(){
    if(confirm('Are you sure?')){
      this.clientService.deleteClient(this.client);
      this.flashMessage.show('Client was removed',
      {cssClass:'alert-success',timeout:4000
    });
    this.router.navigate(['/'])
    }

  }

  updateBalance(){
    this.clientService.updateClient(this.client);
      this.flashMessage.show('Balance updated',{
        cssClass:'alert-success',timeout: 4000
      });
    
    }

  }


