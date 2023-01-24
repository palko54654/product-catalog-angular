import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { catchError } from 'rxjs/operators'
import { Products } from './store/products'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  public getProducts() {
    const url = 'https://ppl-jobs.s3.eu-west-1.amazonaws.com/products.json';
    return this.http.get<Products[]>(url).pipe(
      catchError(error => {
          console.error(error);
          return of([]);
      })
    );
  }

  public getCategories(): Observable<any> {
    const url = 'https://ppl-jobs.s3.eu-west-1.amazonaws.com/product-categories.json'
    return this.http.get<any>(url).pipe(
      catchError(error => {
          console.error(error);
          return of([]);
      })
    );
  }
}
