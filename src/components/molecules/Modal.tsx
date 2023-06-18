import { motion } from 'framer-motion';
import Image from 'next/image';
import { Fab } from 'ui-neumorphism';
import { useAppDispatch, useAppSelector } from '@/state/hooks/hooks';
import { appActions, selectGetIngredients } from '@/state/slices/ingredientSlice';
import { v4 as uuidv4 } from 'uuid';

import Backdrop from '@/components/atoms/BackDrop';
import GenericButton from '@/components/atoms/GenericButton';
import { TypeOfIngredient } from '@/models/TypeOfIngredient.model';
import { modalStyle } from '@/css/general-css';
import { Dispatch, SetStateAction } from 'react';

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

export default function Modal(props: {
  handleClose: () => void;
  ingredient: TypeOfIngredient;
  setShowDetail: Dispatch<SetStateAction<boolean>>;
  isSend: boolean;
}) {
  // const { v4: uuidv4 } = require('uuid');
  const dispatch = useAppDispatch();
  const ingredients = useAppSelector(selectGetIngredients);
  // グローバルに値を追加する
  function handleAddIngredient(ingredient: TypeOfIngredient) {
    dispatch(appActions.addIngredient({ ...ingredient, uuid: uuidv4() }));
    console.log('Ingredients is', ingredients, 'now!');
    props.setShowDetail(false);
  }
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
          <h2 className='w-1/3 text-center'>{props.ingredient.title}</h2>
          <div className='w-1/3 text-right'>
            {/* @ts-ignore */}
            <Fab size='small' onClick={props.handleClose} bgColor='#E4EBF5'>
              <span className='text-xl font-extrabold text-thick'>&times;</span>
            </Fab>
          </div>
        </div>
        <div className='w-full flex justify-center items-center py-10'>
          <div className='w-1/3 aspect-square relative'>
            <Image src={props.ingredient.imageUrl} alt='Picture of the author' layout='fill' objectFit='contain' />
          </div>
          <div className='w-1/2'>{props.ingredient.description}</div>
        </div>
        {props.isSend ? (
          <GenericButton label='追加' func={() => handleAddIngredient(props.ingredient)} colour='#EF9090' />
        ) : (
          <></>
        )}
      </motion.div>
    </Backdrop>
  );
}
