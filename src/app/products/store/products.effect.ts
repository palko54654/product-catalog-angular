import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, map, mergeMap, withLatestFrom, tap } from 'rxjs';
import { ProductsService } from '../products.service';
import { productsFetchAPISuccess, invokeProductsAPI, sortProductsByName, sortProductsByPrice, invokeCategoriesAPI, categoriesFetchAPISuccess, filterProductsByCategory, updateFilteredProducts, invokeNestedCategoriesAPI, nestedCategoriesFetchSuccess} from './products.action';
import { selectCategories, selectProducts, selectNestedCategories } from './products.selector';
import { Products } from './products';

@Injectable()

export class ProductsEffect {
    constructor(
        private actions$: Actions,
        private productsService: ProductsService,
        private store: Store
        ) {}
        
    filterProductsByCategory$ = createEffect(() => {
        let initialProducts: any = []
        return this.actions$.pipe(
            ofType(filterProductsByCategory),
            withLatestFrom(this.store.pipe(select(selectProducts)),
            this.store.pipe(select(selectCategories))),
            tap(([action, products, categories]) => {
                // Store initial state
                if (!initialProducts.length) {
                    initialProducts = products;
                }
            }),
            mergeMap(([action,products, categories]) => {
                const category = categories.find(c => c.id === action.categoryId);
                if (!category) {
                    return [updateFilteredProducts({ filteredProducts: initialProducts })];
                }
                const filteredProducts = initialProducts.filter((product:any) => product.categoryId === category.id);
                return [updateFilteredProducts({ filteredProducts })];
            })
        )
    });

    loadAllProducts$ = createEffect(() => {
        return  this.actions$.pipe(
            ofType(invokeProductsAPI),
            withLatestFrom(this.store.pipe(select(selectProducts))),
            mergeMap(([, productfromStore]) => {
                if (productfromStore.length > 0) {
                return EMPTY;
                }
                return this.productsService
                .getProducts()
                .pipe(
                    map((data) => {
                        const sortedData = data.sort((a, b) => (a.name > b.name ? 1 : -1));
                        return productsFetchAPISuccess({ allProducts: sortedData })
                }));
            })
        )
    });
 
    loadAllCategories$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(invokeNestedCategoriesAPI),
            withLatestFrom(this.store.pipe(select(selectCategories))),
            mergeMap(([action , categoryFromStore]) => {
                if (categoryFromStore.length > 0) {
                return EMPTY
                }
                return this.productsService
                .getCategories()
                .pipe(
                    map((data) => {
                        // let tree = [];
                        // let map = new Map();
                        // for (let category of data) {
                        //     map.set(category.id, { ...category, children: [] });
                        // }
                        // for (let category of map.values()) {
                        //     if (category.parentCategoryId) {
                        //         let parent = map.get(category.parentCategoryId);
                        //         if (parent) {
                        //             parent.children.push(category);
                        //         }
                        //     } else {
                        //         tree.push(category);
                        //     }
                        // }
                        return categoriesFetchAPISuccess({ allCategories: data });
                    })
                )
            })
        )
    })

    loadNestedCategories$ = createEffect(() => {
        return this.actions$.pipe(
        ofType(invokeCategoriesAPI),
        withLatestFrom(this.store.pipe(select(selectNestedCategories))),
        mergeMap(([action , categoryFromStore]) => {
            if (categoryFromStore.length > 0) {
            return EMPTY
            }
            return this.productsService
            .getCategories()
            .pipe(
                map((data) => {
                    let tree = [];
                    let map = new Map();
                    for (let category of data) {
                        map.set(category.id, { ...category, children: [] });
                    }
                    for (let category of map.values()) {
                        if (category.parentCategoryId) {
                            let parent = map.get(category.parentCategoryId);
                            if (parent) {
                                parent.children.push(category);
                            }
                        } else {
                            tree.push(category);
                        }
                    }
                    return nestedCategoriesFetchSuccess({ nestedCategories: tree });
                })
            )
        })
        )
    })

    sortProductsByName$ = createEffect(() => {
        return this.actions$.pipe(
        ofType(sortProductsByName),
        withLatestFrom(this.store.pipe(select(selectProducts))),
        mergeMap(([action, products]) => {
            const sortedProducts = [...products].sort((a, b) => a.name.localeCompare(b.name))
                return [
                    productsFetchAPISuccess({ allProducts: sortedProducts })
                ];
            }
        ))
        
    })
    sortProductsByPrice$ = createEffect(() => {
        return this.actions$.pipe(
        ofType(sortProductsByPrice),
        withLatestFrom(this.store.pipe(select(selectProducts))),
        mergeMap(([, products]) => {
            const sortedProducts: Products[] = [...products].sort((a, b) => a.price - b.price);
            return [productsFetchAPISuccess({ allProducts: sortedProducts })];
        })
        )
    });
}
