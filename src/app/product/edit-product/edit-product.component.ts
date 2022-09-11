import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  product!: Product;
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(){
    const id = this.activatedRoute.snapshot.params['id'];
    this.productService.detail(id).subscribe(
      data => {
        this.product = data;
      },
      err => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000, positionClass: 'toast-center-center',
        });
        this.router.navigate(['/'])
      }
    );
  }

  onUpdate(): void{
    const id = this.activatedRoute.snapshot.params['id'];
    this.productService.update(id, this.product).subscribe(
      data => {
        this.toastr.success('Producto Actualizado', 'Ok', {
          timeOut: 3000, positionClass: 'toast-center-center',
        });
        this.router.navigate(['/'])
      },
      err => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000, positionClass: 'toast-center-center',
        });
        this.router.navigate(['/'])
      }
    );
  }

}
