import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from 'src/app/models/Client';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: '0'
  };

  @ViewChild('clientForm', { static: false }) form;

  disableBalanceOnAdd = true;

  constructor(
    private flashMsg: FlashMessagesService,
    private clientService: ClientService,
    private myRouter: Router
  ) {}

  ngOnInit() {}

  onSubmit(formClient) {
    const { value, valid }: { value: Client; valid: Boolean } = formClient;
    if (this.disableBalanceOnAdd) {
      value.balance = '0';
    }

    if (!valid) {
      this.flashMsg.show(
        'Form is not valid. Please fill out the form correctly',
        {
          cssClass: 'alert-danger',
          timeout: 4000
        }
      );
    } else {
      this.clientService.addClient(value).then(isAdded => {
        if (isAdded) {
          this.flashMsg.show('New client has been added added', {
            cssClass: 'alert-success',
            timeout: 2500
          });

          this.myRouter.navigate(['/']);
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
