import {ModuleWithProviders ,NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from '../categories/categories.component';
import { ProductsService } from './products.service';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { productReducer} from './store/products.reducer';
import { categoryReducer } from './store/categories.reducer'
import { ProductsEffect } from './store/products.effect';
import { nestedcategoryReducer } from './store/nested-categories.reducer';

@NgModule({
  declarations: [
    ProductsComponent,
    CategoriesComponent,
    ProductDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    RouterModule,
    StoreModule.forFeature('products', productReducer),
    StoreModule.forFeature('categories', categoryReducer),
    StoreModule.forFeature('nestedCategories', nestedcategoryReducer),
    EffectsModule.forFeature([ProductsEffect])
  ],
  providers: [ProductsService],
})
export class ProductsModule { }
