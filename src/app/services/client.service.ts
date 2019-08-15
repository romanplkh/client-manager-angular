import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client } from '../models/Client';
import { Action } from 'rxjs/internal/scheduler/Action';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clientsCollection: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client: Observable<Client>;

  constructor(private fStore: AngularFirestore) {
    this.clientsCollection = this.fStore.collection('clients', ref =>
      ref.orderBy('lastName', 'asc')
    );
  }

  getClients(): Observable<Client[]> {
    // Fill observable with datacd
    this.clients = this.clientsCollection.snapshotChanges().pipe(
      map(actions =>
        // ! actions contaons array of metadata+ (data in payload) =>
        // ![{ … }, { … }]0: { type: "added", payload: { … } }
        // !payload: { type: "added", doc: QueryDocumentSnapshot, oldIndex: -1, newIndex: 0 }doc: QueryDocumentSnapshotexists: (...)id: (...)metadata: (...)
        actions.map(client => {
          const data = client.payload.doc.data() as Client;
          const id = client.payload.doc.id;
          return { id, ...data };
        })
      )
    );

    // Return observable
    return this.clients;
  }

  async addClient(client: Client): Promise<boolean> {
    try {
      await this.clientsCollection.add(client);
      return new Promise((resolve, reject) => resolve(true));
    } catch (error) {
      return new Promise((resolve, reject) => resolve(false));
    }
  }

  getClient(id: string): Observable<Client> {
    this.clientDoc = this.fStore.doc<Client>(`clients/${id}`);

    this.client = this.clientDoc.snapshotChanges().pipe(
      map(action => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as Client;
          const id = action.payload.id;

          return { id, ...data };
        }
      })
    );

    return this.client;
  }

  async updateClient(client: Client): Promise<boolean> {
    console.log(client);
    try {
      // Get the client we want to update
      this.clientDoc = this.fStore.doc(`clients/${client.id}`);
      // Update client
      await this.clientDoc.update(client);
      return new Promise((resolve, reject) => resolve(true));
    } catch (error) {
      return new Promise((resolve, reject) => resolve(false));
    }
  }

  async deleteClient(client: Client): Promise<boolean> {
    console.log(client);
    try {
      // Get the client we want to update
      this.clientDoc = this.fStore.doc(`clients/${client.id}`);
      // Update client
      await this.clientDoc.delete();
      return new Promise((resolve, reject) => resolve(true));
    } catch (error) {
      return new Promise((resolve, reject) => resolve(false));
    }
  }
}
