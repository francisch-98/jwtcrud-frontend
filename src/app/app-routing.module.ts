import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailProductComponent } from './product/detail-product/detail-product.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { ListProductComponent } from './product/list-product/list-product.component';
import { NewProductComponent } from './product/new-product/new-product.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProdGuardsService as guard } from './guards/prod-guards.service';


const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'list', component: ListProductComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user'] } },
  { path: 'detail/:id', component: DetailProductComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user'] } },
  { path: 'new', component: NewProductComponent, canActivate: [guard], data: { expectedRol: ['admin'] } },
  { path: 'update/:id', component: EditProductComponent, canActivate: [guard], data: { expectedRol: ['admin'] } },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
