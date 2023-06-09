import { Card, CardContent, Badge, IconButton, Fab, Button } from 'ui-neumorphism';
import Image from 'next/image';

import { TypeOfIngredient } from '@/models/TypeOfIngredient.model';
import sendIcon from '../../assets/send-icon.svg';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/state/hooks/hooks';
import { appActions, selectGetIngredients } from '@/state/slices/ingredientSlice';
import { useDispatch } from 'react-redux';

export default function InputBox() {
  const router = useRouter();

  const dispatch = useDispatch();

  // グローバルに定義されたingredientsから値を取得
  // ***** mock data
  const ingredientsData: Array<TypeOfIngredient> = useAppSelector(selectGetIngredients);

  const handleSendIngredientsAndPageSwitch = (path: string) => {
    console.log(ingredientsData);
    router.push(path);
  };

  function handleDeleteIngredients(uuid: string) {
    dispatch(appActions.deleteIngredientByUuid(uuid));
    console.log('An ingredient', uuid, 'is deleted. Now you have', ingredientsData);
  }
  if (ingredientsData.length !== 0) {
    return (
      <>
        <div className='w-full bottom-5 left-0 right-0 flex justify-center items-center'>
          {/* @ts-ignore */}
          <Card
            elevation={3}
            style={{
              width: '70%',
              borderRadius: '50px',
              paddingTop: '10px',
              paddingRight: '30px',
              paddingBottom: '10px',
              paddingLeft: '30px',
              backgroundColor: '#EF9090',
              marginRight: '1%',
            }}
          >
            {/* The following component cannot be seen in mobile */}
            {ingredientsData.map((element, index) => {
              return (
                // @ts-ignore
                <Card
                  key={index}
                  elevation={3}
                  inset
                  style={{
                    width: '7%',
                    aspectRatio: '1/1',
                    borderRadius: '50%',
                    position: 'relative',
                    marginRight: '2%',
                    backgroundColor: 'white',
                  }}
                  className='lg:inline-block hidden'
                >
                  <Image src={element.imageUrl} alt='Picture of the author' layout='fill' objectFit='contain' />
                  {/* @ts-ignore */}
                  <IconButton
                    rounded
                    size='small'
                    text={false}
                    color='#5E5E5E'
                    bgColor='#E4EBF5'
                    className='absolute'
                    style={{ top: '-7px', right: '-13px' }}
                    onClick={() => handleDeleteIngredients(element.uuid as string)}
                  >
                    <span style={{ fontSize: '18px', margin: '1px 0px 0px 1px', fontWeight: 'bold' }}>&times;</span>
                  </IconButton>
                </Card>
              );
            })}

            {/* The following component is only for mobile */}
            {ingredientsData.map((element, index) => {
              return (
                // @ts-ignore
                <Card
                  key={index}
                  elevation={0}
                  style={{
                    width: '100%',
                    borderRadius: '50px',
                    paddingTop: '5px',
                    paddingRight: '20px',
                    paddingBottom: '5px',
                    paddingLeft: '20px',
                    backgroundColor: 'white',
                    marginBottom: '1%',
                  }}
                  className='flex justify-between items-center lg:hidden'
                >
                  <div>{element.title}</div>
                  {/* @ts-ignore */}
                  <Button rounded color='#5E5E5E' bgColor='#E4EBF5' size='small' onClick={handleDeleteIngredients}>
                    <span style={{ fontSize: '18px', margin: '1px 0px 0px 1px', fontWeight: 'bold' }}>&times;</span>
                  </Button>
                </Card>
              );
            })}
          </Card>
          {/* @ts-ignore */}
          <Button
            class='send_button'
            onClick={() => handleSendIngredientsAndPageSwitch('/confirmation')}
            bgColor='#EF9090'
            style={{ position: 'relative', borderRadius: '25px' }}
          >
            <Image src={sendIcon} alt='' layout='fill' objectFit='contain' className='p-5' />
          </Button>
        </div>
      </>
    );
  } else {
    return <></>;
  }
}
