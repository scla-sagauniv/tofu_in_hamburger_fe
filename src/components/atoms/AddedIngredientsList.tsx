import { TypeOfIngredient } from '@/models/TypeOfIngredient.model';
import { Card, Button } from 'ui-neumorphism';
import { appActions } from '@/state/slices/ingredientSlice';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

export default function AddedIngredientsList(props: { ingredientsData: Array<TypeOfIngredient> }) {
  console.log('an ingredient is added to the sending list!');

  const dispatch = useDispatch();
  function handleDeleteIngredients(uuid: string) {
    dispatch(appActions.deleteIngredientByUuid(uuid));
    console.log('An ingredient', uuid, 'is deleted. Now you have', props.ingredientsData);
  }
  return (
    <>
      {/* @ts-ignore */}
      <Card bordered>
        {props.ingredientsData.map((element, index) => {
          console.log(element);
          return (
            // @ts-ignore
            // <Card
            //   key={index}
            //   elevation={0}
            //   style={{
            //     width: '100%',
            //     borderRadius: '50px',
            //     paddingTop: '5px',
            //     paddingRight: '20px',
            //     paddingBottom: '5px',
            //     paddingLeft: '20px',
            //     backgroundColor: 'white',
            //     marginBottom: '1%',
            //   }}
            //   className='flex justify-between items-center lg:hidden'
            // >
            //   <div>{element.title}</div>
            //   {/* @ts-ignore */}
            //   <Button rounded color='#5E5E5E' bgColor='#E4EBF5' size='small' onClick={handleDeleteIngredients}>
            //     <span style={{ fontSize: '18px', margin: '1px 0px 0px 1px', fontWeight: 'bold' }}>&times;</span>
            //   </Button>
            // </Card>
            <div key={index}>{element.title}</div>
          );
        })}
      </Card>
    </>
  );
}
