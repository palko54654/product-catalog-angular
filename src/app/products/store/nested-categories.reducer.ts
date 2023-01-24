import { createReducer, on } from "@ngrx/store";

import { Categories } from "./categories";
import { nestedCategoriesFetchSuccess} from './products.action';
 
export const initialState: ReadonlyArray<Categories> = [];
 
export const nestedcategoryReducer = createReducer(
    initialState,
    on(nestedCategoriesFetchSuccess, (state, { nestedCategories }) => {
        return nestedCategories
    } )
);