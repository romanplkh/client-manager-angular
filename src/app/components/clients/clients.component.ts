import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/services/client.service';
import { format } from 'url';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: Client[] = [];
  totalOwed: number;

  constructor(private clientService: ClientService) {}




  ngOnInit() {
    this.clientService.getClients().subscribe({
      next: (clients: Client[]) => {
        this.clients = clients;
        this.getTotalOwed();
      }
    });
  }

  getTotalOwed() {
    this.totalOwed = this.clients.reduce((cur, next) => {
      return cur + +next.balance;
    }, 0);
  }

 
}
