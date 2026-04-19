import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createProduct, clearMessages, selectProductStatus, selectProductError } from '../features/productSlice'
import Spinner from '../components/Spinner'
import Alert   from '../components/Alert'

const INIT = {name:'',price:'',stock:'',description:''}

const AddProductPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const status   = useSelector(selectProductStatus)
  const apiErr   = useSelector(selectProductError)
  const [form, setForm]         = useState(INIT)
  const [localErr, setLocalErr] = useState(null)

  useEffect(() => () => dispatch(clearMessages()), [dispatch])

  const onChange = e => setForm(f => ({...f, [e.target.name]: e.target.value}))

  const validate = () => {
    if (!form.name.trim())                     return 'Product name is required'
    if (!form.price || parseFloat(form.price) <= 0) return 'Price must be > 0'
    if (form.stock === '' || parseInt(form.stock) < 0) return 'Stock must be >= 0'
    return null
  }

  const onSubmit = async e => {
    e.preventDefault()
    const err = validate()
    if (err) { setLocalErr(err); return }
    setLocalErr(null)
    try {
      await dispatch(createProduct({
        name: form.name.trim(),
        price: parseFloat(form.price),
        stock: parseInt(form.stock),
        description: form.description.trim()
      })).unwrap()
      navigate('/products')
    } catch {}
  }

  return (
    <div className="container">
      <h1 className="page-title">Add New Product</h1>
      <div className="card" style={{maxWidth:560}}>
        <Alert type="error" message={localErr || apiErr} onClose={() => { setLocalErr(null); dispatch(clearMessages()) }}/>
        <form onSubmit={onSubmit}>
          <div className="form-group"><label>Product Name *</label><input name="name" value={form.name} onChange={onChange} placeholder="e.g. MacBook Pro"/></div>
          <div className="form-group"><label>Price ($) *</label><input name="price" type="number" step="0.01" min="0.01" value={form.price} onChange={onChange} placeholder="999.99"/></div>
          <div className="form-group"><label>Stock *</label><input name="stock" type="number" min="0" value={form.stock} onChange={onChange} placeholder="50"/></div>
          <div className="form-group"><label>Description</label><input name="description" value={form.description} onChange={onChange} placeholder="Optional"/></div>
          <div className="btn-row">
            <button type="submit" className="btn btn-primary" disabled={status==='loading'}>
              {status === 'loading' ? 'Creating...' : 'Create Product'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/products')}>Cancel</button>
          </div>
        </form>
        {status === 'loading' && <Spinner/>}
      </div>
    </div>
  )
}
export default AddProductPage
