import { ToastContainer } from 'react-toastify'

const Alert = () => {
  return (
    <ToastContainer
      position='top-right'
      autoClose={3000}
      closeOnClick={true}
      pauseOnHover={true}
      draggable
      theme='colored'
    />
  )
}

export default Alert
