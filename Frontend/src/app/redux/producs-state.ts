// import { createStore } from "redux";
// import { ProductModel } from "../models/product.model";

// // 1 state
// export class ProductsState {
//     public vacations: ProductModel[] = [];
// }

// //2 Action Type
// export enum ProductsActionType {
//     FetchProducts = "FetchProducts",
//     AddProduct = "AddProduct",
//     DeleteProduct = "DeleteProduct"
// }

// //3 Action 

// export interface ProductAction {
//     type: ProductsActionType;
//     payload: any;
// }

// // 4 Reducer 
// export function productsReducer(currentState = new ProductsState(), action: ProductAction): ProductsState {
//     const newState = { ...currentState };

//     switch (action.type) {
//         case ProductsActionType.FetchProducts:
//             newState.products = action.payload;
//             break;

//         case ProductsActionType.AddProduct:
//             if (newState.products.length > 0) {

//                 newState.products.push(action.payload);
//             }
//             break;
//         case ProductsActionType.DeleteProduct:
//             const indexToDelete = newState.products.findIndex(p => p.id === action.payload);
//             if(indexToDelete >= 0){
//                 newState.products.splice(indexToDelete,1)
//             }
//         break;
//     }
//     return newState
// }


// // 5 .store

// export const productsStore = createStore(productsReducer)




