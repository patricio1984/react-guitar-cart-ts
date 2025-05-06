import { useState, useEffect, useMemo } from 'react'
import { db } from '../data/db'
import type { ProductGuitar, CartItem, GuitarID } from "../types"

const useCart = () => {
  const initialCart = () : CartItem[] => {
    const localStorageCart = localStorage.getItem('cart')

    return localStorageCart ? JSON.parse(localStorageCart) : []
  }
  
  const [data] = useState(db)
  const [cart, setCart] = useState(initialCart)

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])
  
  const addToCart = (item: ProductGuitar ) => {
    const itemExists = cart.findIndex(guitar => guitar.id === item.id)
  
    if (itemExists >= 0) {
      const updatedCart = [...cart]
      const currentQuantity = updatedCart[itemExists].quantity
  
      if (currentQuantity < item.stock) {
        updatedCart[itemExists].quantity++
        setCart(updatedCart)
      }
    } else {
      const newItem: CartItem = { ...item, quantity: 1 }
      setCart([...cart, newItem])
    }
  }

  const removeFromCart = (id: GuitarID) => {
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
  }

  const changeQuantity = (id: GuitarID, up: boolean) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id
          ? {
              ...item,
              quantity: up
                ? Math.min(item.quantity + 1, item.stock)
                : Math.max(item.quantity - 1, 1),       
            }
          : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const isEmpty = useMemo(() => cart.length === 0, [cart])
  const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart])
  const totalItems = useMemo(() => cart.reduce((total, item) => total + item.quantity, 0), [cart])
    
  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    changeQuantity,
    clearCart,
    isEmpty,
    cartTotal,
    totalItems
  }
}

export default useCart