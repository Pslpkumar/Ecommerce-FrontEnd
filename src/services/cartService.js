import axios from 'axios'
const BASE = '/api/cart'
const cartService = {
  addToCart: data   => axios.post(`${BASE}/add`, data),
  getCart:   userId => axios.get(`${BASE}/${userId}`),
  clearCart: userId => axios.delete(`${BASE}/${userId}/clear`),
}
export default cartService
