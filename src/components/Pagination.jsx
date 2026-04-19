const Pagination = ({currentPage,totalPages,onPageChange}) => {
  if (totalPages <= 1) return null
  return (
    <div className="pagination">
      <button onClick={() => onPageChange(0)} disabled={currentPage===0}>First</button>
      <button onClick={() => onPageChange(currentPage-1)} disabled={currentPage===0}>Prev</button>
      {Array.from({length:totalPages},(_,i)=>i).map(p => (
        <button key={p} className={currentPage===p?'active':''} onClick={() => onPageChange(p)}>{p+1}</button>
      ))}
      <button onClick={() => onPageChange(currentPage+1)} disabled={currentPage===totalPages-1}>Next</button>
      <button onClick={() => onPageChange(totalPages-1)}  disabled={currentPage===totalPages-1}>Last</button>
    </div>
  )
}
export default Pagination
