import { NavLink } from 'react-router-dom'
const Navbar = () => (
  <nav className="navbar">
    <span className="navbar-brand">EnterpriseShop</span>
    <div>
      <NavLink to="/products">Products</NavLink>
      <NavLink to="/add-product">Add Product</NavLink>
      <NavLink to="/cart">Cart</NavLink>
    </div>
  </nav>
)
export default Navbar
