import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  name: string ='';
  price: number = 0;

  constructor(
    private productService: ProductService, 
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onCreate(): void{
    const product = new Product(this.name, this.price);
    this.productService.save(product).subscribe(
      data => {
        this.toastr.success('Producto Creado', 'Ok', {
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
    )
  }
}
