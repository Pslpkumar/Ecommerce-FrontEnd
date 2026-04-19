import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import cartService from '../services/cartService'
export const addToCart = createAsyncThunk('cart/add',
  async (data,{rejectWithValue}) => {
    try { const r = await cartService.addToCart(data); return r.data.data }
    catch(e){ return rejectWithValue(e.response?.data?.message||'Failed') }
  })
export const fetchCart = createAsyncThunk('cart/fetch',
  async (userId,{rejectWithValue}) => {
    try { const r = await cartService.getCart(userId); return r.data.data }
    catch(e){ return rejectWithValue(e.response?.data?.message||'Not found') }
  })
export const clearCartThunk = createAsyncThunk('cart/clear',
  async (userId,{rejectWithValue}) => {
    try { await cartService.clearCart(userId); return userId }
    catch(e){ return rejectWithValue(e.response?.data?.message||'Failed') }
  })
const s = createSlice({
  name:'cart',
  initialState:{cartData:null,status:'idle',error:null,successMessage:null},
  reducers:{ clearCartMessages(s){ s.error=null; s.successMessage=null } },
  extraReducers: b => { b
    .addCase(addToCart.pending,        s=>{ s.status='loading'; s.error=null })
    .addCase(addToCart.fulfilled,      (s,a)=>{ s.status='succeeded'; s.cartData=a.payload; s.successMessage='Item added!' })
    .addCase(addToCart.rejected,       (s,a)=>{ s.status='failed'; s.error=a.payload })
    .addCase(fetchCart.pending,        s=>{ s.status='loading' })
    .addCase(fetchCart.fulfilled,      (s,a)=>{ s.status='succeeded'; s.cartData=a.payload })
    .addCase(fetchCart.rejected,       (s,a)=>{ s.status='failed'; s.error=a.payload })
    .addCase(clearCartThunk.fulfilled,  s=>{ s.cartData=null; s.successMessage='Cart cleared!' })
  }
})
export const { clearCartMessages } = s.actions
export const selectCartData    = s => s.cart.cartData
export const selectCartStatus  = s => s.cart.status
export const selectCartError   = s => s.cart.error
export const selectCartSuccess = s => s.cart.successMessage
export default s.reducer
