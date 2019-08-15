import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/Client';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  client: Client;
  id: string;
  hasBalance = false;
  showBalanceUpdateInput = false;

  constructor(
    private clientService: ClientService,
    private activeRoute: ActivatedRoute,
    private myRouter: Router,
    private flashMsg: FlashMessagesService
  ) {}

  ngOnInit() {
    this.activeRoute.params.subscribe((params: Params) => {
      this.clientService.getClient(params.id).subscribe({
        next: (client: Client) => {

          if (client !== null) {

            // convert to boolean
            this.hasBalance = parseFloat(client.balance) > 0;

            this.client = client;

          }
        }
      });
    });
  }
}
