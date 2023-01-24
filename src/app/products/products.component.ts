import { Component, OnInit, ViewChild} from '@angular/core';
import { CategoriesComponent } from '../categories/categories.component';
import { ProductsService } from './products.service';
import { select, Store } from '@ngrx/store';
import { filterProductsByCategory, invokeProductsAPI, sortProductsByName, sortProductsByPrice, invokeNestedCategoriesAPI } from './store/products.action';
import { selectProducts, selectNestedCategories} from './store/products.selector';
import { Observable } from 'rxjs';
import { Products } from './store/products';
import { Categories } from './store/categories';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @ViewChild(CategoriesComponent) categoriesComponent: any;

  
  products$: Observable<Products[]>
  categories$: Observable<Categories[]>
  filteredProducts$: Observable<Products[]>

  constructor(public productsService: ProductsService, private store: Store) {
    this.products$ = this.store.pipe(select(selectProducts));
    this.filteredProducts$ = this.store.pipe(select(selectProducts));
    this.categories$ = this.store.pipe(select(selectNestedCategories))
  }

  //nest Categories 
  createCategoryTree(categories: any[], parentCategoryId: string = 'parentCategoryId'): any[] {
    let tree = [];
    let map = new Map();
    for (let category of categories) {
        map.set(category.id, { ...category, children: [] });
    }
    for (let category of map.values()) {
        if (category[parentCategoryId]) {
            let parent = map.get(category[parentCategoryId]);
            if (parent) {
                parent.children.push(category);
            }
        } else {
            tree.push(category);
        }
    }
    return tree;
  }
  
  //handle Click on category and filter products
  onCategoryClick(event: Event ,categoryId?: string) { 
    event.preventDefault()
    let link: any = event.target;
    let links = document.getElementsByClassName('category-link');
    for (let i = 0; i < links.length; i++) {
      links[i].classList.remove('active');
    }
    link.classList.add('active');
    this.filterByCategory(categoryId)
  };
  
  // sort products, if event is not triggered sort default by name
  sortProducts(event: any) {
    let sortType = event.target.value
    if (sortType === "name") {
      this.sortByName()
    } else {
      this.sortByPrice()
      this.categories$.subscribe(data => {
        console.log(data)
       })
      
    }
  } 
  filterByCategory(categoryId?: string) {
    this.store.dispatch(filterProductsByCategory({categoryId}));
  }

  sortByName() {
    this.store.dispatch(sortProductsByName());
  }

  sortByPrice() {
    this.store.dispatch(sortProductsByPrice());
  }
  
  ngOnInit(): void {
    this.store.dispatch(invokeProductsAPI());
    this.store.dispatch(invokeNestedCategoriesAPI())
    //this.store.dispatch(invokeCategoriesAPI())
  }
}

