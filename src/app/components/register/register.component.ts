import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private myRouter: Router,
    private flashMSG: FlashMessagesService
  ) {}

  ngOnInit() { }

 async onSubmit() {
    try {
      const user = await this.authService.register(this.email, this.password);
      this.flashMSG.show('You are now registered', { cssClass: 'alert-success', timeout: 3500 });
      this.myRouter.navigate(['/']);

    } catch (error) {
      this.flashMSG.show(`${error.message}`, {
        cssClass: 'alert-danger',
        timeout: 3500
      });


    }

  }
}
