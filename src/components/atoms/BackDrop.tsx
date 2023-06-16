import { motion } from 'framer-motion';
import { ReactNode } from 'react';

import { modalStyle } from '@/css/general-css';

export default function Backdrop(props: { children: ReactNode; onClick: () => void }) {
  return (
    <motion.div
      onClick={props.onClick}
      className={`${modalStyle.className} backdrop`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {props.children}
      {modalStyle.styles}
    </motion.div>
  );
}
