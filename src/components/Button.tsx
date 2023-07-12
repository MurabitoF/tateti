import { motion } from 'framer-motion'

interface Prop {
  label: string
  onClick: () => void
  className?: string
  initial?: object
  animate?: object
  exit?: object
}

const Button: React.FC<Prop> = ({ label, onClick, ...props }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{
        boxShadow: 'none',
        translateY: 8,
        transition: { duration: 0.1 }
      }}
      onTap={onClick}
      {...props}
    >
      {label}
    </motion.button>
  )
}

export default Button
