import { createReducer, on } from "@ngrx/store";

import { Categories } from "./categories";
import { categoriesFetchAPISuccess} from './products.action';
 
export const initialState: ReadonlyArray<Categories> = [];
 
export const categoryReducer = createReducer(
    initialState,
    on(categoriesFetchAPISuccess, (state, { allCategories }) => {
        return allCategories
    }),
);