import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/Client';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: '0'
  };

  loaded: boolean = false;

  disableBalanceOnEdit: boolean;

  constructor(
    private clientService: ClientService,
    private activeRoute: ActivatedRoute,
    private myRouter: Router,
    private flashMsg: FlashMessagesService,
    private settingsService: SettingsService
  ) {}

  ngOnInit() {
    this.activeRoute.params.subscribe((params: Params) => {
      this.clientService.getClient(params.id).subscribe({
        next: (client: Client) => {
  
          if (client != null) {
            this.client = client;
            this.loaded = true;
          } 
        }
      });
    });

    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;
  }

  onSubmit({ value, valid }: { value: Client, valid: boolean }) {
     if (!valid) {
       this.flashMsg.show(
         'Form is not valid. Please fill out the form correctly',
         {
           cssClass: 'alert-danger',
           timeout: 4000
         }
       );
     } else {
      // value.id = this.client.id;
       const updatedClient = {id: this.client.id, ...value};
       this.clientService.updateClient(updatedClient).then(isUpdated => {
         if (isUpdated) {
           this.flashMsg.show('Client has been updated', {
             cssClass: 'alert-success',
             timeout: 2000
           });

           setTimeout(()=>this.myRouter.navigate([`/client/${this.client.id}`]), 2000)

           
         } else {
           this.flashMsg.show('Oops. Something went wrong. Try again', {
             cssClass: 'alert-warning',
             timeout: 3500
           });
         }
       });
     }
  }
}
