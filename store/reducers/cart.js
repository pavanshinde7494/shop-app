import { ADD_TO_CART , REMOVE_FROM_CART } from "../actions/cart"
import CartItem from "../../models/cart-item"
import { ADD_ORDER } from "../actions/orders";
import { DELETE_PRODUCT, UPDATE_PRODUCT } from "../actions/products";

const initialState = {
    items : {},
    totalAmount : 0
}

export default (state = initialState , action)=>{
    switch(action.type){
        case ADD_TO_CART :  
            const addedProduct = action.product;
            const prodPrice = addedProduct.price;
            const prodTitle = addedProduct.title;
            

            let updatedOrNewCartItem;
            if(state.items[addedProduct.id]){
                updatedOrNewCartItem = new CartItem(
                    state.items[addedProduct.id].quantity+1,
                    prodPrice,
                    prodTitle,
                    state.items[addedProduct.id].sum + prodPrice
                );
                return {
                    ...state , 
                    items : { ...state.items , [addedProduct.id] : updatedOrNewCartItem },
                    totalAmount : state.totalAmount + prodPrice 
                }
            }
            else{
                updatedOrNewCartItem = new CartItem(1,prodPrice,prodTitle,prodPrice);
                return {
                    ...state,
                    items : {...state.items , [addedProduct.id] : updatedOrNewCartItem},
                    totalAmount : state.totalAmount + prodPrice
                }
            }
        case REMOVE_FROM_CART : 
            const selectedItem = state.items[action.pid];
            const currentQty = selectedItem.quantity;
            let updatedCartItems
            if(currentQty > 1){
                // just remove not erase
                updatedCartItems = new CartItem(
                    selectedItem.quantity-1,
                    selectedItem.productPrice,
                    selectedItem.productTitle,
                    selectedItem.sum - selectedItem.productPrice
                ) 
                updatedCartItems = {...state.items , [action.pid] : updatedCartItems};
            }
            else{
                // erase
                updatedCartItems = {...state.items};
                delete updatedCartItems[action.pid];
            }
            return {
                ...state,
                items : updatedCartItems,
                totalAmount : state.totalAmount - selectedItem.productPrice
            }
        // Retriving action of other reducer  
        case ADD_ORDER :
            return initialState

        // retriving from reducer products
        case DELETE_PRODUCT : 
            if(!state.items[action.pid]){
                return state
            }
            const updatedItems = {...state.items};
            const itemTotal = state.items[action.pid].sum;
            delete updatedItems[action.pid]
            return {
                ...state,
                items : updatedItems,
                totalAmount : state.totalAmount - itemTotal
            }
        // case UPDATE_PRODUCT :
        //     const itemsToUpdate = items[action.pid];
        //     const updatedCartItems = new CartItem(
        //         itemsToUpdate.quantity,
        //         itemsToUpdate.price,
        //         action.productData.title,
        //         itemsToUpdate.sum
        //     )
        //     return {
        //         ...state ,
        //         items: updatedCartItems
        //     }

        default : 
            return state
    }
}