import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private myRouter: Router,
    private flashMSG: FlashMessagesService,
    private settingsService: SettingsService
  ) {}
  
  isLoggedIn: boolean;
  loggedUser = '';
  showRegister: boolean;

  async onLogoutClick() {
    try {
      await this.authService.logOut();
      this.flashMSG.show('You are logged out', {
        cssClass: 'alert-success',
        timeout: 2500
      });

      this.showRegister = this.settingsService.getSettings().allowRegistration;
      this.myRouter.navigate(['/login']);
    } catch (error) {}
  }

  ngOnInit() {
    this.authService.isLoggedIn().subscribe({
      next: user => {
        if (user != null) {
          this.isLoggedIn = true;
          this.loggedUser = user.email;
          this.showRegister = false;
        } else {
          this.isLoggedIn = false;
          this.loggedUser = '';
        }
      }
    });

    this.showRegister = this.settingsService.getSettings().allowRegistration;
  }
}
