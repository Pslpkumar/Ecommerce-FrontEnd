const Spinner = ({text='Loading...'}) => (
  <div className="spinner-wrap">
    <div className="spinner"/>
    <span style={{color:'#6b7280',fontWeight:500}}>{text}</span>
  </div>
)
export default Spinner
