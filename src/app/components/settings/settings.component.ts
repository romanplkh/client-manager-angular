import { Component, OnInit } from '@angular/core';
import { Settings } from 'src/app/models/Settings';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settings: Settings;

  constructor(
    private myRouter: Router,
    private flashMSG: FlashMessagesService,
    private settingsService: SettingsService
  ) {}

  ngOnInit() {
    this.settings = this.settingsService.getSettings();
  }

  onSubmit() {
    this.settingsService.changeSettings(this.settings);
    this.flashMSG.show("Changes saved", { cssClass: 'alert-success', timeout: 3000 });
    
  }
}
