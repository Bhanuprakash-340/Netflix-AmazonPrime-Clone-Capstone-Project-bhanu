import React from 'react'

const CartContext = React.createContext({
  username: '',
  password: '',
  triggerChangeUsername: () => {},
  triggerChangePassword: () => {},
})

export default CartContext
