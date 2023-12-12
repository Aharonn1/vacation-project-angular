import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/layout-area/page-not-found/page-not-found.component';
import { AddProductComponent } from './components/products-area/add-product/add-product.component';
import { ProductListComponent } from './components/products-area/product-list/product-list.component';
import { UpdateProductComponent } from './components/products-area/update-product/update-product.component';
import { ProductsAdminComponent } from './components/products-area/products-admin/products-admin.component';
import { LoginPageComponent } from './components/auth-area/login-page/login-page.component';
import { RegisterPageComponent } from './components/auth-area/register-page/register-page.component';

const routes: Routes = [
  {path:"users/vacations",component: ProductListComponent},
  {path:"admin/vacations",component: ProductsAdminComponent},
  {path:"trip/new",component: AddProductComponent},
  {path:"trip/update/:vacationId",component: UpdateProductComponent},
  {path:"register",component: RegisterPageComponent},
  {path:"login",component: LoginPageComponent},
  {path:"**", component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
