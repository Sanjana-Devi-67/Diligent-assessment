import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard({p}){
  return (
    <Link to={'/product/'+p.id} className="card">
      <img src={p.image} alt={p.name} loading="lazy" />
      <div className="p">
        <h3>{p.name}</h3>
        <div className="row">
          <div className="price">₹{p.price}</div>
          <div className="badge">★ {p.rating}</div>
          <div className="badge">{p.category}</div>
        </div>
      </div>
    </Link>
  )
}
