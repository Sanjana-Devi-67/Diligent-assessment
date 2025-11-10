import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { api } from '../api'
import ProductCard from '../components/ProductCard'

export default function Home(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [params] = useSearchParams()
  const q = params.get('q') || ''

  useEffect(()=>{
    setLoading(true)
    const fn = q ? api.search(q) : api.products()
    Promise.resolve(fn).then(d=>setItems(d.items)).finally(()=>setLoading(false))
  }, [q])

  return (
    <div>
      <section className="hero">
        <h1>Discover products you'll love</h1>
        <div className="kicker">{q ? `Showing results for "${q}"` : 'Hand‑picked items across categories'}</div>
      </section>
      {loading ? <div>Loading…</div> : (
        items.length ? <div className="grid">{items.map(p=> <ProductCard key={p.id} p={p} />)}</div>
        : <div>No results</div>
      )}
    </div>
  )
}
