import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private myRouter: Router,
    private flashMSG: FlashMessagesService
  ) {}

  ngOnInit() {
    this.authService.isLoggedIn().subscribe({
      next: (user) => {
        if (user != null) {
        this.myRouter.navigate(['/'])
      }}
    })
  }

  async onSubmit() {
    try {
      const user = await this.authService.login(this.email, this.password);
      this.flashMSG.show(`You are now logged in as ${user.user.email}`, {
        cssClass: 'alert-success',
        timeout: 4000
      });
      this.myRouter.navigate(['/'])
    } catch (error) {
      this.flashMSG.show(`${error.message}`, {
        cssClass: 'alert-danger',
        timeout: 4000
      });
    }
  }
}
