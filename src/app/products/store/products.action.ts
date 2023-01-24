import { createAction, props } from '@ngrx/store';
import { Products } from './products';
import { Categories } from './categories';
 
export const invokeProductsAPI = createAction(
  '[Products API] Invoke Products Fetch API'
);
 
export const productsFetchAPISuccess = createAction(
  '[Products API] Fetch API Success',
  props<{ allProducts: Products[] }>()
);

export const sortProductsByName = createAction(
    '[Product] Sort Products by Name',
);

export const sortProductsByPrice = createAction(
    '[Product] Sort Products by Price'
);

export const invokeCategoriesAPI = createAction(
    '[Categories API] Invoke Categories Fetch API'
  );

export const categoriesFetchAPISuccess = createAction(
    '[Categories API] Fetch API Success',
    props<{ allCategories: Categories[] }>()
);

export const filterProductsByCategory = createAction(
    '[Product] Filter Products by Category',
    props<{ categoryId?: string}>()
)

export const updateFilteredProducts = createAction(
    '[Product] Update filtered products',
    props<{ filteredProducts: Products[] }>()
);

export const invokeNestedCategoriesAPI = createAction(
  '[Categories API] Invoke Categories Fetch API'
);

export const nestedCategoriesFetchSuccess = createAction(
  '[Categories] Categories nested',
  props<{ nestedCategories: Categories[] }>()
)
