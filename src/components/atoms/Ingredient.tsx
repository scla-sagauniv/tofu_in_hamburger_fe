import { AnimatePresence, motion } from 'framer-motion';
import { Card, IconButton } from 'ui-neumorphism';
import Image from 'next/image';
import { useState } from 'react';
import { useAppSelector } from '@/state/hooks/hooks';
import { appActions, selectGetIngredients } from '@/state/slices/ingredientSlice';
import { useDispatch } from 'react-redux';

import Modal from '@/components/molecules/Modal';
import { TypeOfIngredient } from '@/models/TypeOfIngredient.model';
import { modalStyle } from '@/css/general-css';

export default function Ingredient(props: { ingredient: TypeOfIngredient; isSend: boolean }) {
  const [showDetail, setShowDetail] = useState(false);
  const close = () => setShowDetail(false);
  const open = () => setShowDetail(true);
  const dispatch = useDispatch();
  const [onceClicked, setOnceClicked] = useState(false);
  // グローバルに定義されたingredientsから値を取得
  // ***** mock data
  const ingredientsData: Array<TypeOfIngredient> = useAppSelector(selectGetIngredients);

  function handleDeleteIngredients(uuid: string) {
    dispatch(appActions.deleteIngredientByUuid(uuid));
    setOnceClicked(true);
    console.log('An ingredient', uuid, 'is deleted. Now you have', ingredientsData);
  }

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
        {showDetail && !onceClicked && (
          <Modal
            handleClose={close}
            ingredient={props.ingredient}
            setShowDetail={setShowDetail}
            isSend={props.isSend}
          />
        )}
      </AnimatePresence>

      <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => (showDetail ? close() : open())}>
        {/* @ts-ignore */}
        <Card elevation={3} style={{ width: '80%', aspectRatio: '1/1', borderRadius: '50%', position: 'relative' }}>
          <Image src={props.ingredient.imageUrl} alt='Picture of the author' layout='fill' objectFit='contain' />
          {!props.isSend ? (
            // @ts-ignore
            <IconButton
              rounded
              size='medium'
              text={false}
              color='#5E5E5E'
              bgColor='#E4EBF5'
              className='absolute'
              style={{ top: '0px', right: '0px' }}
              onClick={() => {
                handleDeleteIngredients(props.ingredient.uuid as string);
              }}
              disabled={onceClicked}
            >
              <span style={{ fontSize: '23px', margin: '1px 0px 0px 1px', fontWeight: 'bold' }}>&times;</span>
            </IconButton>
          ) : (
            <></>
          )}
        </Card>
      </motion.a>
      {modalStyle.styles}
    </>
  );
}
