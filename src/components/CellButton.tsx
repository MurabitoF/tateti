import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface Props {
  label: 'X' | 'O'
  onClick: () => void
}

const CellButton: React.FC<Props> = ({ label, onClick }) => {
  return (
    <motion.button
      whileHover={{ filter: 'brightness(1.1)' }}
      whileTap={{ boxShadow: 'none', translateY: 8 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
    >
      <AnimatePresence>
        <motion.span
          className={`btn-text player-${label}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {label}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  )
}

export default CellButton
