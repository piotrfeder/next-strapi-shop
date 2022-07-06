import React from 'react'

const initialState = {
  orders: [],
  user: {
    id: null,
    username: null,
    email: null,
  }
}

export const Context = React.createContext()

export const ContextReducer = (state, action) => {
  switch (action.type) {
    case 'addToBasket': {
      const orders = state.orders;
      let newOrders = null;
      let sameProductExtsis = false;
      orders.map((item, index) => {
        if (item.activeFormat.name === action.payload.activeFormat.name && item.id === action.payload.id) {
          orders[index].quantity = orders[index].quantity + action.payload.quantity;
          sameProductExtsis= true;
        }
      })
      newOrders = orders.concat(action.payload)

      return {
        ...state,
        orders: sameProductExtsis ? orders : newOrders,
      }
    }
    case 'changeBasketQuantity': {
      const orders = state.orders;
      const itemIndex = orders.findIndex(({id}) => id === action.payload.id);
      orders[itemIndex].quantity = action.payload.value;
      return {
        ...state,
        orders
      }
    }
    case 'deleteProductFromBasket': {
      const orders = state.orders;
      const itemIndex = orders.findIndex(({id, activeFormat}) => id === action.payload.id && activeFormat.name === action.payload.format);
      orders.splice(itemIndex, 1);
      return {
        ...state,
        orders
      }

    }
    case 'setUser': {
      const userData = { id: action.payload.id, username: action.payload.username, email: action.payload.email};
      return {
        ...state,
        user: userData
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(ContextReducer, initialState)
  const value = { state, dispatch }
  return <Context.Provider value={value}>{children}</Context.Provider>
}