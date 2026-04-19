import axios from 'axios'
const BASE = '/api/products'
const productService = {
  getAll: (p=0,s=10,sb='id',sd='asc') => axios.get(`${BASE}?page=${p}&size=${s}&sortBy=${sb}&sortDir=${sd}`),
  getById:  id       => axios.get(`${BASE}/${id}`),
  create:   data     => axios.post(BASE, data),
  update:   (id,d)   => axios.put(`${BASE}/${id}`, d),
  delete:   id       => axios.delete(`${BASE}/${id}`),
  abovePrice: min    => axios.get(`${BASE}/above-price?minPrice=${min}`),
  search: (name,p=0,s=10) => axios.get(`${BASE}/search?name=${name}&page=${p}&size=${s}`),
}
export default productService
