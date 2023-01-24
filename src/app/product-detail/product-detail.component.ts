import { Component } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ProductsService } from '../products/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {

  public product: any
  public parameter: any

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {
    this.parameter = this.route.snapshot.params
  }

  getProduct() {
    this.productsService.getProducts().subscribe((response) => {
      this.product = response.filter((res: any) => res.id === this.parameter.id)[0]
    });
  }
  ngOnInit() { 
    this.getProduct()
  }
}