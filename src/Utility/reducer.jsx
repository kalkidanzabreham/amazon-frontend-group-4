import { act } from "react";
import { TYPE } from "./action.type";

export const initialState = {
    basket:[],
    user:null
}
export const reducer = (state,action) => {
    switch(action.type){
        case TYPE.ADD_TO_BASKET :
           const exsitingItem = state.basket.find((item)=>item.id === action.item.id)
           if(!exsitingItem) {
            return{
                ...state,
                basket : [...state.basket,{...action.item,amount:1}]
            }
           }else{
            const updateBasket = state.basket.map((item)=>{
                 return item.id === action.item.id? {...item,amount:item.amount + 1}:item
            })
            return {
              ...state,
              basket: updateBasket,
            }

           }
          case TYPE.REMOVE_FROM_BASKET :
             const index = state.basket.findIndex((item)=>{
                return item.id == action.id
             })
             let newBasket = [...state.basket]
             if(index >= 0){
                if(newBasket[index].amount > 1){
                    newBasket[index]= {...newBasket[index],amount:newBasket[index].amount -1}
                }
                else{
                    newBasket.splice(index,1)
                }
             }
             return {
                ...state,
                basket:newBasket
             }
         case TYPE.SET_USER:
            return{
                ...state,
                user:action.user
            }
        case TYPE.EMPTY_BASKET:
            return{
                ...state,
                basket:[]
            }
        default:
            return state;
    }
}