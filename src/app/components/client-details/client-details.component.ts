import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/Client';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  constructor(
    private clientService: ClientService,
    private activeRoute: ActivatedRoute,
    private myRouter: Router,
    private flashMsg: FlashMessagesService,
    private settingsService: SettingsService
  ) {}
  client: Client;
  hasBalance: boolean;
  showBalanceUpdateInput = false;
  disableBalanceOnEdit: boolean;

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

    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;
  }

  updateBalance() {
    if (+this.client.balance >= 0 && this.client.balance != '') {
      this.clientService.updateClient(this.client);
      this.flashMsg.show('Balance updated', {
        cssClass: 'alert-success',
        timeout: 3000
      });
      this.showBalanceUpdateInput = false;
    } else {
      this.flashMsg.show('Balance is not valid', {
        cssClass: 'alert-warning',
        timeout: 2500
      });
    }
  }

  onDelete() {
    this.clientService.deleteClient(this.client).then(isDeleted => {
      if (isDeleted) {
        this.flashMsg.show('Client deleted', {
          cssClass: 'alert-success',
          timeout: 2000
        });

        setTimeout(() => {
          this.myRouter.navigate(['/']);
        }, 2000);
      } else {
        this.flashMsg.show('Oops. Something went wrong. Try again', {
          cssClass: 'alert-warning',
          timeout: 2500
        });
      }
    });
  }
}
