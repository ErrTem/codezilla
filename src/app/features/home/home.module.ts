import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/components/home/home.component';
import { SharedModule } from '@shared/shared.module';
import { ProductCardComponent } from '@shared/components';
import { PRODUCT_SERVICE_TOKEN, ProductService } from '@core/services';
import { CoreModule } from '@core/core.module';
import { HomeRoutingModule } from '@features/home/home-routing.module';
import { SingleProductComponent } from '@features/home/home/components/single-product/single-product.component';
import { LoaderComponent } from '@features/home/home/components/loader/loader.component';

@NgModule({
  declarations: [
    HomeComponent,
    SingleProductComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    ProductCardComponent,
    HomeRoutingModule,
  ],
  providers: [{
    provide: PRODUCT_SERVICE_TOKEN,
    useClass: ProductService,
  }],
  exports: [
    HomeComponent,
    SingleProductComponent,
    LoaderComponent
  ],
})

export class HomeModule {
}
