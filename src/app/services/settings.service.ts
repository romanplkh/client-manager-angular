import { Injectable } from '@angular/core';
import { Settings } from '../models/Settings';

@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  settings: Settings = {
    allowRegistration: true,
    disableBalanceOnAdd: false,
    disableBalanceOnEdit: true
  };

  constructor() {
    if (localStorage.getItem('settings-client-manager') != null) {
      this.settings = JSON.parse(
        localStorage.getItem('settings-client-manager')
      );
    }
  }

  getSettings(): Settings {
    return this.settings;
  }

  changeSettings(settings: Settings) {
    localStorage.setItem('settings-client-manager', JSON.stringify(settings));
  }
}
