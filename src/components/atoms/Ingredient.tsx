import { AnimatePresence, motion } from 'framer-motion';
import { Card } from 'ui-neumorphism';
import Image from 'next/image';
import { useState } from 'react';

import pic from '../../assets/image_png.png';
import Modal from '@/components/molecules/Modal';
import { modalStyle } from '@/css/general-css';

export default function Ingredient() {
  const [showDetail, setshowDetail] = useState(false);
  const close = () => setshowDetail(false);
  const open = () => setshowDetail(true);

  return (
    <>
      <AnimatePresence
        // Disable any initial animations on children that
        // are present when the component is first rendered
        initial={false}
        // Only render one component at a time.
        // The exiting component will finish its exit
        // animation before entering component is rendered
        mode='wait'
        // Fires when all exiting nodes have completed animating out
        onExitComplete={() => null}
      >
        {showDetail && <Modal handleClose={close} text='modal' />}
      </AnimatePresence>

      <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => (showDetail ? close() : open())}>
        <Card elevation={3} style={{ width: '80%', aspectRatio: '1/1', borderRadius: '50%', position: 'relative' }}>
          <Image src={pic} alt='Picture of the author' layout='fill' objectFit='contain' />
        </Card>
      </motion.a>
      {modalStyle.styles}
    </>
  );
}
