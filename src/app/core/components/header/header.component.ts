import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Router } from "@angular/router";

import { Observable, Subscription } from 'rxjs';

import { ProfileState } from '@ngxs/profile.state';
import { UserInfoInterface } from '@core/interfaces/user.interface';
import { NotificationService } from '@core/services';
import { AuthService } from "@core/services/auth.service";
import { ClearUserInfo } from "@ngxs/profile.actions";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public errorMessage: string | null = null;
  public successMessage: string | null = null;
  private errorSubscription!: Subscription;
  private successSubscription!: Subscription;

  @Select (ProfileState.getUserInfo) userInfo$!: Observable<UserInfoInterface>;

  constructor(
    private readonly notificationService: NotificationService,
    private readonly authService: AuthService,
    private readonly store: Store,
    private readonly router: Router,
    ) {
  }

  ngOnInit(): void {
    //temporally until have no toast service
    this.errorSubscription = this.notificationService.error$.subscribe(errorMessage => {
      this.errorMessage = errorMessage;
      setTimeout(() => {
        this.errorMessage = null;
      }, 30000);
    });

    this.successSubscription = this.notificationService.success$.subscribe(successMessage => {
      this.successMessage = successMessage;
      setTimeout(() => {
        this.successMessage = null;
      }, 30000);
    });
  }

  public logout(): void {
    this.authService.userLogout();
    this.router.navigate(['auth/login']);
    this.store.dispatch(new ClearUserInfo());
  }

  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  closeBanner(): void {
    this.errorMessage = null;
    this.successMessage = null;
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
    this.successSubscription.unsubscribe();
  }
}