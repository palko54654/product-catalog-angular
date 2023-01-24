import { createFeatureSelector } from '@ngrx/store';
import { Products } from './products';
import { Categories } from './categories';

 
export const selectProducts = createFeatureSelector<Products[]>('products');

export const selectCategories = createFeatureSelector<Categories[]>('categories');
export const selectNestedCategories = createFeatureSelector<Categories[]>('nestedCategories');