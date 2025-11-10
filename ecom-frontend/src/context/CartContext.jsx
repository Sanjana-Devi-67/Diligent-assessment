import React, {createContext, useContext, useEffect, useState} from 'react'

const CartContext = createContext(null)
export const useCart = () => useContext(CartContext)

export function CartProvider({children}){
  const [items, setItems] = useState(() => JSON.parse(localStorage.getItem('cart')||'[]'))
  useEffect(()=>localStorage.setItem('cart', JSON.stringify(items)), [items])

  const add = (product, qty=1)=>{
    setItems(prev => {
      const i = prev.findIndex(p=>p.id===product.id)
      if(i>-1){
        const copy = [...prev]; copy[i].qty += qty; return copy
      }
      return [...prev, { ...product, qty }]
    })
  }
  const remove = (id)=> setItems(prev => prev.filter(p=>p.id!==id))
  const setQty = (id, qty)=> setItems(prev => prev.map(p=> p.id===id ? {...p, qty: Math.max(1, qty)} : p))
  const clear = ()=> setItems([])
  const total = items.reduce((s,p)=> s + p.price * p.qty, 0)

  return <CartContext.Provider value={{items, add, remove, setQty, clear, total}}>{children}</CartContext.Provider>
}
