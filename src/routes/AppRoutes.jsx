import { Routes, Route, Navigate } from 'react-router-dom'
import ProductListPage from '../pages/ProductListPage'
import AddProductPage  from '../pages/AddProductPage'
import CartPage        from '../pages/CartPage'
const AppRoutes = () => (
  <Routes>
    <Route path="/"            element={<Navigate to="/products" replace/>}/>
    <Route path="/products"    element={<ProductListPage/>}/>
    <Route path="/add-product" element={<AddProductPage/>}/>
    <Route path="/cart"        element={<CartPage/>}/>
    <Route path="*"            element={<Navigate to="/products" replace/>}/>
  </Routes>
)
export default AppRoutes
