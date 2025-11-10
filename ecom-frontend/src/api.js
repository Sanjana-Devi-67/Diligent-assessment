export const API = import.meta.env.VITE_API_URL || 'http://localhost:4000'
async function json(method, url, body, token){
  const res = await fetch(API + url, {
    method,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: 'Bearer ' + token } : {}) },
    body: body ? JSON.stringify(body) : undefined
  })
  if(!res.ok) throw new Error((await res.json()).message || 'Request failed')
  return res.json()
}
export const api = {
  products: () => json('GET','/api/products'),
  product: (id) => json('GET','/api/products/'+id),
  search: (q) => json('GET','/api/search?q='+encodeURIComponent(q)),
  register: (data) => json('POST','/api/auth/register', data),
  login: (data) => json('POST','/api/auth/login', data),
  me: (token) => json('GET','/api/me', null, token)
}
