import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './components/layout-area/layout/layout.component';
import { HeaderComponent } from './components/layout-area/header/header.component';
import { FooterComponent } from './components/layout-area/footer/footer.component';
import { MenuComponent } from './components/layout-area/menu/menu.component';
import { FormsModule } from '@angular/forms';
import { ProductListComponent } from './components/products-area/product-list/product-list.component';
import { PageNotFoundComponent } from './components/layout-area/page-not-found/page-not-found.component';
import {HttpClientModule} from "@angular/common/http";
import { ProductCardComponent } from './components/products-area/product-card/product-card.component';
import { AddProductComponent } from './components/products-area/add-product/add-product.component';
import { UpdateProductComponent } from './components/products-area/update-product/update-product.component';
import { ProductsAdminComponent } from './components/products-area/products-admin/products-admin.component';
import { CardAdminComponent } from './components/products-area/card-admin/card-admin.component';
import { LoginPageComponent } from './components/auth-area/login-page/login-page.component';
import { RegisterPageComponent } from './components/auth-area/register-page/register-page.component';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    ProductListComponent,
    PageNotFoundComponent,
    ProductCardComponent,
    AddProductComponent,
    UpdateProductComponent,
    LoginPageComponent,
    RegisterPageComponent,
    ProductsAdminComponent,
    CardAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
