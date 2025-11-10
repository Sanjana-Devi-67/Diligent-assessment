import React from 'react'
import { useCart } from '../context/CartContext'

export default function Cart(){
  const { items, setQty, remove, total, clear } = useCart()
  if(!items.length) return <div>Your cart is empty.</div>
  return (
    <div>
      <h2>Shopping Cart</h2>
      {items.map(p=> (
        <div key={p.id} className="row" style={{justifyContent:'space-between', padding:'12px 0', borderBottom:'1px solid #233'}}>
          <div className="row">
            <img src={p.image} alt="" style={{width:72, height:56, objectFit:'cover', borderRadius:8}}/>
            <div>
              <div style={{fontWeight:600}}>{p.name}</div>
              <div className="kicker">₹{p.price} · {p.category}</div>
            </div>
          </div>
          <div className="quantity">
            <button className="qty-btn" onClick={()=>setQty(p.id, p.qty-1)}>−</button>
            <div>{p.qty}</div>
            <button className="qty-btn" onClick={()=>setQty(p.id, p.qty+1)}>+</button>
          </div>
          <div className="price">₹{p.price * p.qty}</div>
          <button className="btn" onClick={()=>remove(p.id)}>Remove</button>
        </div>
      ))}
      <div className="row" style={{justifyContent:'space-between', marginTop:16}}>
        <div className="kicker">Taxes are included. Free shipping over ₹999.</div>
        <div className="row" style={{alignItems:'center', gap:12}}>
          <h3 className="price" style={{margin:0}}>Total: ₹{total}</h3>
          <button className="btn" onClick={()=>{ clear(); alert('Order placed! (demo)')}}>Checkout</button>
        </div>
      </div>
    </div>
  )
}
