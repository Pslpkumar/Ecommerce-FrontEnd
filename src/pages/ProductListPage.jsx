import { useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../features/cartSlice'
import useProducts from '../hooks/useProducts'
import Spinner    from '../components/Spinner'
import Alert      from '../components/Alert'
import Pagination from '../components/Pagination'
import { formatCurrency } from '../utils/formatters'

const ProductListPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [search,   setSearch]   = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [sortBy,   setSortBy]   = useState('id')
  const [sortDir,  setSortDir]  = useState('asc')
  const userId = 'user-001'

  const { products,status,error,successMsg,totalPages,currentPage,handleDelete,handlePageChange,dismissMessages } = useProducts(sortBy,sortDir)

  const filtered = useMemo(() =>
    products
      .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
      .filter(p => maxPrice ? p.price <= parseFloat(maxPrice) : true),
    [products,search,maxPrice])

  const handleAddToCart = useCallback((product) => {
    dispatch(addToCart({productId:product.id,quantity:1,userId}))
      .unwrap()
      .then(() => alert('Added to cart: ' + product.name))
      .catch(err => alert('Error: ' + err))
  },[dispatch])

  if (status === 'loading') return <Spinner text="Fetching products..."/>

  return (
    <div className="container">
      <h1 className="page-title">Product Catalog</h1>
      <div className="stats-row">
        <div className="stat-card"><div className="stat-num">{products.length}</div><div className="stat-label">Total</div></div>
        <div className="stat-card"><div className="stat-num" style={{color:'#10b981'}}>{products.filter(p=>p.stock>0).length}</div><div className="stat-label">In Stock</div></div>
        <div className="stat-card"><div className="stat-num" style={{color:'#ef4444'}}>{products.filter(p=>p.stock===0).length}</div><div className="stat-label">Out of Stock</div></div>
      </div>
      <Alert type="error"   message={error}      onClose={dismissMessages}/>
      <Alert type="success" message={successMsg} onClose={dismissMessages}/>
      <div className="card">
        <div className="filter-row">
          <input placeholder="Search by name..." value={search} onChange={e=>setSearch(e.target.value)} style={{flex:2}}/>
          <input type="number" placeholder="Max price" value={maxPrice} onChange={e=>setMaxPrice(e.target.value)} style={{flex:1}}/>
          <select value={sortBy} onChange={e=>setSortBy(e.target.value)}>
            <option value="id">ID</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="stock">Stock</option>
          </select>
          <select value={sortDir} onChange={e=>setSortDir(e.target.value)}>
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
          <button className="btn btn-primary" onClick={() => navigate('/add-product')}>+ Add Product</button>
        </div>
        {filtered.length === 0
          ? <div className="empty-state"><div className="empty-icon">o</div><div>No products found.</div></div>
          : (
            <div className="table-wrap">
              <table>
                <thead><tr><th>ID</th><th>Name</th><th>Price</th><th>Stock</th><th>Description</th><th>Actions</th></tr></thead>
                <tbody>
                  {filtered.map(p => (
                    <tr key={p.id}>
                      <td>#{p.id}</td>
                      <td><strong>{p.name}</strong></td>
                      <td><strong>{formatCurrency(p.price)}</strong></td>
                      <td>
                        <span className={`badge ${p.stock>10?'badge-success':p.stock>0?'badge-warning':'badge-danger'}`}>
                          {p.stock > 0 ? `${p.stock} units` : 'Out of Stock'}
                        </span>
                      </td>
                      <td>{p.description || '-'}</td>
                      <td>
                        <div style={{display:'flex',gap:6}}>
                          <button className="btn btn-success btn-sm" onClick={() => handleAddToCart(p)} disabled={p.stock===0}>Add to Cart</button>
                          <button className="btn btn-danger btn-sm"  onClick={() => handleDelete(p.id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        }
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
      </div>
    </div>
  )
}
export default ProductListPage
