import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Router } from "@angular/router";

import { Observable, Subscription } from 'rxjs';

import { ProfileState } from '@core/ngxs/profile.state';
import { UserInfoInterface } from '@core/interfaces/user.interface';
import { NotificationService } from '@core/services';
import { AuthService } from "@core/services/auth.service";
import { ClearUserInfo } from "@core/ngxs/profile.actions";
import { BasketState } from '@core/ngxs/basket.state';
import { MatDialog } from '@angular/material/dialog';
import { BasketComponent } from '@shared/components';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit, OnDestroy {

  public errorMessage: string | null = null;
  public successMessage: string | null = null;
  private errorSubscription!: Subscription;
  private successSubscription!: Subscription;

  @Select(ProfileState.getUserInfo) userInfo$!: Observable<UserInfoInterface>;
  @Select(BasketState.getTotalPrice) totalPrice$!: Observable<number>;
  @Select(BasketState.getTotalQuantity) totalQuantity$!: Observable<number>;

  public isCustomerButtonClicked: boolean = false;
  public customerNameAbbreviation: string | undefined = '';

  constructor(
    private readonly notificationService: NotificationService,
    private readonly authService: AuthService,
    private readonly store: Store,
    private readonly router: Router,
    private readonly dialog: MatDialog,
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

    this.userInfo$.subscribe((res) => {
      this.customerNameAbbreviation = res.firstName
        .substring(0, 2)
        .toUpperCase();
    })
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(BasketComponent, {
      panelClass: 'app-basket-dialog',
      position: {
        top: '0',
        right: '0',
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('Dialog closed');
    });
  }

  public logout(): void {
    this.authService.userLogout();
    this.router.navigate(['login']);
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

  login() {
    this.router.navigate(['login']);
  }
}