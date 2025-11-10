import React, {createContext, useContext, useEffect, useState} from 'react'
import { api } from '../api'

const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext)

export function AuthProvider({children}){
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')||'null'))
  const [token, setToken] = useState(() => localStorage.getItem('token'))

  useEffect(()=>{
    if(token) localStorage.setItem('token', token); else localStorage.removeItem('token')
    if(user) localStorage.setItem('user', JSON.stringify(user)); else localStorage.removeItem('user')
  }, [user, token])

  const login = async (email,password)=>{
    const {token, user} = await api.login({email,password})
    setToken(token); setUser(user)
  }
  const register = async (name,email,password)=>{
    const {token, user} = await api.register({name,email,password})
    setToken(token); setUser(user)
  }
  const logout = ()=>{ setToken(null); setUser(null) }

  const value = { user, token, login, register, logout }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
