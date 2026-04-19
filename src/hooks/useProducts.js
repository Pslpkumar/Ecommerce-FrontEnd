import { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, deleteProduct, clearMessages, setPage,
  selectAllProducts, selectProductStatus, selectProductError,
  selectProductSuccess, selectTotalPages, selectCurrentPage, selectPageSize } from '../features/productSlice'
const useProducts = (sortBy='id', sortDir='asc') => {
  const dispatch    = useDispatch()
  const products    = useSelector(selectAllProducts)
  const status      = useSelector(selectProductStatus)
  const error       = useSelector(selectProductError)
  const successMsg  = useSelector(selectProductSuccess)
  const totalPages  = useSelector(selectTotalPages)
  const currentPage = useSelector(selectCurrentPage)
  const pageSize    = useSelector(selectPageSize)
  const load = useCallback(() => {
    dispatch(fetchProducts({page:currentPage,size:pageSize,sortBy,sortDir}))
  },[dispatch,currentPage,pageSize,sortBy,sortDir])
  useEffect(() => { load() },[load])
  const handleDelete     = useCallback(id => { if(window.confirm('Delete?')) dispatch(deleteProduct(id)) },[dispatch])
  const handlePageChange = useCallback(p  => dispatch(setPage(p)),[dispatch])
  const dismissMessages  = useCallback(() => dispatch(clearMessages()),[dispatch])
  return { products,status,error,successMsg,totalPages,currentPage,pageSize,handleDelete,handlePageChange,dismissMessages,loadProducts:load }
}
export default useProducts
