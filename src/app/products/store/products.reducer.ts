import { createReducer, on } from "@ngrx/store";
import { Products } from "../store/products";
import { productsFetchAPISuccess, updateFilteredProducts} from './products.action';
 
export const initialState: ReadonlyArray<Products> = [];
 
export const productReducer = createReducer(
    initialState,
    on(productsFetchAPISuccess, (state, { allProducts }) => {
        return allProducts;
      }),
    on(updateFilteredProducts, (state, { filteredProducts }) => filteredProducts),
);
