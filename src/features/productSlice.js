import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import productService from '../services/productService'
export const fetchProducts = createAsyncThunk('products/fetchAll',
  async ({page,size,sortBy,sortDir},{rejectWithValue}) => {
    try { const r = await productService.getAll(page,size,sortBy,sortDir); return r.data.data }
    catch(e){ return rejectWithValue(e.response?.data?.message||'Failed') }
  })
export const createProduct = createAsyncThunk('products/create',
  async (data,{rejectWithValue}) => {
    try { const r = await productService.create(data); return r.data.data }
    catch(e){ return rejectWithValue(e.response?.data?.message||'Failed') }
  })
export const deleteProduct = createAsyncThunk('products/delete',
  async (id,{rejectWithValue}) => {
    try { await productService.delete(id); return id }
    catch(e){ return rejectWithValue(e.response?.data?.message||'Failed') }
  })
export const updateProduct = createAsyncThunk('products/update',
  async ({id,data},{rejectWithValue}) => {
    try { const r = await productService.update(id,data); return r.data.data }
    catch(e){ return rejectWithValue(e.response?.data?.message||'Failed') }
  })
const s = createSlice({
  name:'products',
  initialState:{items:[],totalPages:0,totalElements:0,currentPage:0,pageSize:10,status:'idle',error:null,successMessage:null},
  reducers:{
    clearMessages(s){ s.error=null; s.successMessage=null },
    setPage(s,a){ s.currentPage=a.payload },
    setPageSize(s,a){ s.pageSize=a.payload },
  },
  extraReducers: b => { b
    .addCase(fetchProducts.pending,  s=>{ s.status='loading'; s.error=null })
    .addCase(fetchProducts.fulfilled,(s,a)=>{ s.status='succeeded'; s.items=a.payload?.content||[]; s.totalPages=a.payload?.totalPages||0; s.totalElements=a.payload?.totalElements||0 })
    .addCase(fetchProducts.rejected, (s,a)=>{ s.status='failed'; s.error=a.payload })
    .addCase(createProduct.pending,  s=>{ s.status='loading' })
    .addCase(createProduct.fulfilled,(s,a)=>{ s.status='succeeded'; s.items.unshift(a.payload); s.successMessage='Product created!' })
    .addCase(createProduct.rejected, (s,a)=>{ s.status='failed'; s.error=a.payload })
    .addCase(deleteProduct.fulfilled,(s,a)=>{ s.items=s.items.filter(p=>p.id!==a.payload); s.successMessage='Deleted!' })
    .addCase(deleteProduct.rejected, (s,a)=>{ s.error=a.payload })
    .addCase(updateProduct.fulfilled,(s,a)=>{ const i=s.items.findIndex(p=>p.id===a.payload.id); if(i!==-1)s.items[i]=a.payload; s.successMessage='Updated!' })
    .addCase(updateProduct.rejected, (s,a)=>{ s.error=a.payload })
  }
})
export const { clearMessages, setPage, setPageSize } = s.actions
export const selectAllProducts    = s => s.products.items
export const selectProductStatus  = s => s.products.status
export const selectProductError   = s => s.products.error
export const selectProductSuccess = s => s.products.successMessage
export const selectTotalPages     = s => s.products.totalPages
export const selectCurrentPage    = s => s.products.currentPage
export const selectPageSize       = s => s.products.pageSize
export default s.reducer
