const Alert = ({type='error',message,onClose}) => {
  if (!message) return null
  return (
    <div className={`alert alert-${type}`}>
      {message}
      {onClose && <button className="alert-close" onClick={onClose}>x</button>}
    </div>
  )
}
export default Alert
