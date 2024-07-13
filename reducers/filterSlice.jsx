export const productReducer =(state,action)=>{
   switch (action.type) {
     case "SORT_BY_PRICE":
       return { ...state, sort: action.payload };
     case "SORT_BY_DISCOUNT":
       return { ...state, byDiscount: action.payload };
     case "FILTER_BY_STOCK":
       return { ...state, byStock: !state.byStock };
     case "FILTER_BY_DELIVERY":
       return { ...state, byFreeDelivery : !state.byFreeDelivery };
     case "FILTER_BY_RATING":
       return { ...state, byRating: action.payload };
     case "FILTER_BY_SEARCH":
       return { ...state, searchQuery : action.payload };
     case "CLEAR_FILTERS":
       return {
         byStock: false,
         byFastDelivery: false,
         byRating: 0,
         searchQuery: "",
       };
     default:
       return state;
   }
}