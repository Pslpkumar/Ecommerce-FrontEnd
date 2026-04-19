import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCart, clearCartThunk, clearCartMessages,
  selectCartData, selectCartStatus, selectCartError, selectCartSuccess } from '../features/cartSlice'
import Spinner from '../components/Spinner'
import Alert   from '../components/Alert'
import { formatCurrency } from '../utils/formatters'

const CartPage = () => {
  const dispatch   = useDispatch()
  const cartData   = useSelector(selectCartData)
  const status     = useSelector(selectCartStatus)
  const error      = useSelector(selectCartError)
  const successMsg = useSelector(selectCartSuccess)
  const [userId]   = useState('user-001')

  useEffect(() => {
    dispatch(fetchCart(userId))
    return () => dispatch(clearCartMessages())
  }, [dispatch, userId])

  const handleClear = () => {
    if (window.confirm('Clear all items?')) dispatch(clearCartThunk(userId))
  }

  if (status === 'loading') return <Spinner text="Loading cart..."/>

  const itemCount = cartData?.items?.length || 0

  return (
    <div className="container">
      <h1 className="page-title">Shopping Cart</h1>
      <Alert type="error"   message={error}      onClose={() => dispatch(clearCartMessages())}/>
      <Alert type="success" message={successMsg} onClose={() => dispatch(clearCartMessages())}/>
      <div className="card">
        {!cartData || itemCount === 0
          ? <div className="empty-state"><div className="empty-icon">o</div><div>Cart is empty. Go add some products!</div></div>
          : (
            <>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
                <div>
                  <span style={{color:'#6b7280'}}>User: </span>
                  <strong>{cartData.userId}</strong>
                  <span className="badge badge-success" style={{marginLeft:10}}>{itemCount} item{itemCount!==1?'s':''}</span>
                </div>
                <button className="btn btn-danger btn-sm" onClick={handleClear}>Clear Cart</button>
              </div>
              <div className="table-wrap">
                <table>
                  <thead><tr><th>Product</th><th>Unit Price</th><th>Qty</th><th>Total</th></tr></thead>
                  <tbody>
                    {cartData.items.map(item => (
                      <tr key={item.id}>
                        <td><strong>{item.productName}</strong></td>
                        <td>{formatCurrency(item.productPrice)}</td>
                        <td><span className="badge badge-warning">{item.quantity}</span></td>
                        <td><strong style={{color:'#10b981'}}>{formatCurrency(item.totalPrice)}</strong></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="cart-total">Grand Total: {formatCurrency(cartData.grandTotal)}</div>
            </>
          )
        }
      </div>
    </div>
  )
}
export default CartPage
