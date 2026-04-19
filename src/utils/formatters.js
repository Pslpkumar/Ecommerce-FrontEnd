export const formatCurrency = v =>
  new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(v)
export const truncate = (s,n=40) => s?.length>n ? s.slice(0,n)+'...' : (s||'')
