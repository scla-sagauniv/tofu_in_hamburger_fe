import { motion } from 'framer-motion';
import Image from 'next/image';
import { Fab } from 'ui-neumorphism';

import Backdrop from '@/components/atoms/BackDrop';
import GenericButton from '@/components/atoms/GenericButton';
import { TypeOfIngredient } from '@/models/TypeOfIngredient';
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

// グローバルに値を追加する
const handleAddIngredient = () => {
  console.log('Added to the list!');
  return null;
};

export default function Modal(props: { handleClose: () => void; ingredient: TypeOfIngredient }) {
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
        <div className='w-full flex justify-end items-center px-5'>
          <h2 className='w-1/3 text-center'>{props.ingredient.name}</h2>
          <div className='w-1/3 text-right'>
            {/* @ts-ignore */}
            <Fab size='small' onClick={props.handleClose} bgColor='#E4EBF5'>
              <span className='text-xl font-extrabold text-thick'>&times;</span>
            </Fab>
          </div>
        </div>
        <div className='w-full flex justify-center items-center py-10'>
          <div className='w-1/3 aspect-square relative'>
            <Image src={props.ingredient.url} alt='Picture of the author' layout='fill' objectFit='contain' />
          </div>
          <div className='w-1/2'>{props.ingredient.description}</div>
        </div>
        <GenericButton label='追加' func={handleAddIngredient} colour='#EF9090' />
      </motion.div>
    </Backdrop>
  );
}
