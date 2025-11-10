import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login(){
  const { login, register } = useAuth()
  const nav = useNavigate()
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ name:'', email:'', password:'' })
  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async e => {
    e.preventDefault()
    try{
      if(mode==='login') await login(form.email, form.password)
      else await register(form.name, form.email, form.password)
      nav('/')
    }catch(err){ alert(err.message) }
  }

  return (
    <div style={{maxWidth:420, margin:'20px auto'}}>
      <h2 style={{margin:0}}>{mode==='login' ? 'Welcome back' : 'Create an account'}</h2>
      <div className="kicker">{mode==='login' ? 'Use your email to sign in' : 'Start shopping in seconds'}</div>
      <form onSubmit={onSubmit} style={{marginTop:14, display:'grid', gap:10}}>
        {mode==='register' && (
          <input name="name" placeholder="Your name" required value={form.name} onChange={onChange}
            style={{padding:'12px 14px', borderRadius:12, background:'#121a2b', color:'white', border:'1px solid #233'}} />
        )}
        <input name="email" type="email" placeholder="Email" required value={form.email} onChange={onChange}
          style={{padding:'12px 14px', borderRadius:12, background:'#121a2b', color:'white', border:'1px solid #233'}} />
        <input name="password" type="password" placeholder="Password" required value={form.password} onChange={onChange}
          style={{padding:'12px 14px', borderRadius:12, background:'#121a2b', color:'white', border:'1px solid #233'}} />
        <button className="btn">{mode==='login' ? 'Login' : 'Register'}</button>
      </form>
      <div className="kicker" style={{marginTop:10}}>
        {mode==='login' ? 'New here?' : 'Already have an account?'}
        <button className="btn" style={{marginLeft:10}} onClick={()=>setMode(mode==='login'?'register':'login')}>
          {mode==='login' ? 'Create account' : 'Login'}
        </button>
      </div>
    </div>
  )
}
