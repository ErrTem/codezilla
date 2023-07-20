import { Component, OnInit } from '@angular/core';
import { CartItem } from '@core/interfaces/product.interface';
import { GetAllProducts } from '@core/ngxs/products.actions';
import { Select, Store } from '@ngxs/store';
import { ProductsState } from '@core/ngxs/products.state';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HostComponent } from '@features/host/host/host.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  @Select(ProductsState.getAllProducts) products$!: Observable<CartItem[]>;
  public products: CartItem[] = [];

  constructor(
    private readonly store: Store,
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(new GetAllProducts())
    this.products$.subscribe((data: CartItem[]) => {
      this.products = data;
    });

  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(HostComponent, {
      data: {},
    })
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['../'], {relativeTo: this.route});
    });
  }
}
