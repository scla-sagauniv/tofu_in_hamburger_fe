import { motion } from 'framer-motion';

import Backdrop from '@/components/atoms/BackDrop';
import GenericButton from '@/components/atoms/GenericButton';
import { modalStyle } from '@/css/general-css';

const dropIn = {
  hidden: {
    y: '-100vh',
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: '100vh',
    opacity: 0,
  },
};

export default function Modal(props: { handleClose: () => void; text: string }) {
  return (
    <Backdrop onClick={props.handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className={`${modalStyle.className} modal`}
        variants={dropIn}
        initial='hidden'
        animate='visible'
        exit='exit'
      >
        <p>{props.text}</p>
        <GenericButton label='Close' func={props.handleClose} />
      </motion.div>
    </Backdrop>
  );
}
