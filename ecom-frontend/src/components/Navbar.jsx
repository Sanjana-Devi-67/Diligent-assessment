import React, { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Navbar(){
  const { user, logout } = useAuth()
  const { items } = useCart()
  const [q, setQ] = useState('')
  const nav = useNavigate()
  const search = (e)=>{ e.preventDefault(); nav('/?q='+encodeURIComponent(q)) }
  return (
    <div className="nav">
      <div className="nav-inner container">
        <Link to="/" className="brand">NimbleCart</Link>
        <form className="search" onSubmit={search}>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search products, categories, descriptions..." />
          <button className="btn">Search</button>
        </form>
        <Link to="/cart" className="btn">Cart ({items.length})</Link>
        {user ? (
          <button className="btn" onClick={logout}>Logout</button>
        ) : (
          <Link to="/login" className="btn">Login</Link>
        )}
      </div>
    </div>
  )
}
