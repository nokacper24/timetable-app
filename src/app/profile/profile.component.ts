import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { User } from 'src/utils/user';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user: User | undefined;
  private userSubscription: Subscription;

  constructor(private userService: UserService) {

    this.userSubscription = this.userService.userObservable.subscribe(user => {
      this.user = user;
    })


  }

  onSubmitLogin(f: NgForm) {
    this.userService.login(f.value.username, f.value.password);

  }
  onSubmitRegister(f: NgForm) {
    this.userService.register(f.value.username, f.value.password);

  }

  onLogOut() {
    console.log("logout");
    this.userService.logout();
  }

}
