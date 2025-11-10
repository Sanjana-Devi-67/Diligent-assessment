import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../api'
import { useCart } from '../context/CartContext'

export default function ProductDetails(){
  const { id } = useParams()
  const [p, setP] = useState(null)
  const [qty, setQty] = useState(1)
  const { add } = useCart()

  useEffect(()=>{ api.product(id).then(d=>setP(d.item)) }, [id])
  if(!p) return <div>Loading…</div>

  return (
    <div className="row" style={{alignItems:'flex-start', gap:24}}>
      <img src={p.image} alt={p.name} style={{width:420, maxWidth:'100%', borderRadius:16}} />
      <div style={{flex:1}}>
        <h2 style={{margin:'0 0 6px'}}>{p.name}</h2>
        <div className="kicker">{p.category} · ★ {p.rating}</div>
        <p style={{lineHeight:1.6}}>{p.description}</p>
        <h3 className="price">₹{p.price}</h3>
        <div className="row" style={{marginTop:10}}>
          <div className="quantity">
            <button className="qty-btn" onClick={()=>setQty(Math.max(1, qty-1))}>−</button>
            <div>{qty}</div>
            <button className="qty-btn" onClick={()=>setQty(qty+1)}>+</button>
          </div>
          <button className="btn" onClick={()=>add(p, qty)}>Add to Cart</button>
        </div>
      </div>
    </div>
  )
}
