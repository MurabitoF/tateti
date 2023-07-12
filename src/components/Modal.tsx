import { motion } from 'framer-motion'
import { createPortal } from 'react-dom'
import Button from './Button'

interface Prop {
  title: string
  message: string
  onClick: () => void
}

const Modal: React.FC<Prop> = ({ title, message, onClick }) => {
  return (
    createPortal(
      <div
        className='modal-container'
      >
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className='modal'
        >
          <h2 className={`player-${title}`}>{title}</h2>
          <p>{message}</p>
          <Button
            label='VOLVER A JUGAR'
            onClick={onClick}
            className='modal-btn'
          />
        </motion.div>
      </div>,
      document.body)
  )
}

export default Modal
