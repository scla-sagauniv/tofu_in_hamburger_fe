'use client';
import panImage from '@/assets/panImage.svg';
import GenericButton from '@/components/atoms/GenericButton';
import Header from '@/components/molecules/Header';
import { TypeOfIngredient } from '@/models/TypeOfIngredient.model';
import { useAppSelector } from '@/state/hooks/hooks';
import { appActions, selectGetIngredients } from '@/state/slices/ingredientSlice';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Ingredient from '@/components/atoms/Ingredient';
import { useClient } from '@/hooks/Client';
import { IngredientService } from '@/gen/ingredientRain_connect';
import { Ingredient as IngredientType } from '../../gen/ingredientRain_pb';
import { motion } from 'framer-motion';
import { Card, IconButton, Divider } from 'ui-neumorphism';

export default function Confirmation() {
  const router = useRouter();
  const client = useClient(IngredientService);
  const dispatch = useDispatch();

  const ingredients = useAppSelector(selectGetIngredients);
  const [addedIngredients, setAddedIngredients] = useState<Array<TypeOfIngredient>>([]);
  const [dom, setDom] = useState<Array<JSX.Element>>([]);

  const [res, setRes] = useState<Array<IngredientType>>([]);
  const get = async () => {
    const stream = client.streamIngredient({});
    for await (const el of stream) {
      setRes(el.ingredients);
    }
  };

  function handleDeleteAnIngredient(uuid: string) {
    //　グローバルから消去
    dispatch(appActions.deleteIngredientByUuid(uuid));
    // propsからも消去
    setAddedIngredients((prevIngredients) => prevIngredients.filter((ingredient) => ingredient.uuid !== uuid));
    console.log('An ingredient', uuid, 'is deleted. Now you have', ingredients);
  }

  dispatch(appActions.updateIngredients(ingredients));
  useEffect(() => {
    const removeElement = (index: number, element: TypeOfIngredient) => {
      setDom((prevDom) => {
        const updatedDom = [...prevDom];
        const removed = updatedDom.splice(index, 1);
        setAddedIngredients((prevAddedIngredients) => [...prevAddedIngredients, element]); // 更新後の値を使用して addedIngredients を更新
        console.log(removed, 'Dom is deleted out of screen (but in store)!');
        console.log('Now', addedIngredients, 'are in the sending list');
        return updatedDom;
      });
    };

    for (const [index, element] of Object.entries(ingredients)) {
      let durationTime = Number((Math.random() * 10) % 7);

      const motionDiv = (
        <motion.div
          key={index}
          animate={{ y: '150vh' }}
          transition={{
            delay: durationTime,
            duration: 10,
          }}
          initial={{
            y: '-100vh',
          }}
        >
          <Ingredient ingredient={element} isSend={false} />
        </motion.div>
      );

      setTimeout(() => {
        removeElement(Number(index), element);
      }, 10 * 1000);

      setDom((prevDom) => {
        const newDom = [...prevDom, motionDiv];
        console.log(newDom);
        return newDom;
      });
    }
  }, []);

  // useEffect(() => {
  //   // grpcサーバからserver streamingのデータを取得してくる
  //   async () => {
  //     await get();
  //     console.log('stream is fetched. Response is here: ', res);
  //   };
  //   // (グローバルにそれを保存)＋画面から出たら削除する
  //   const ingredientsOfEveryone: Array<TypeOfIngredient> = [] as Array<TypeOfIngredient>;
  //   // 👇本当はingredientsOfEveryoneを入れる
  // }, []);

  async function handleGetRecipes(ingredients: Array<TypeOfIngredient>) {
    console.log('the ingredients are sent!');
    // recipe api fetch await

    // 自動的にreceive pageに遷移する
    router.push('/receive');
  }

  function handleDeleteIngredients() {
    dispatch(appActions.deleteAllIngredients());
    console.log("Ingredients are deleted. The user'll be sent back to the send page.");
    router.push('/send');
  }

  return (
    <>
      <div className='overflow-hidden flex flex-col  min-h-screen min-w-screen md:justify-center items-center px-10 justify-start'>
        <Header title='' isSend={true} />
        <div className='w-full h-full flex md:flex-row flex-col grow md:items-end justify-center items-center md:px-10 relative'>
          <div className='absolute top-0 w-full md:grid lg:grid-cols-6 lg:gap-10 md:grid-cols-4 md:gap-5 hidden'>
            {dom}
          </div>
          <Image src={panImage} alt='' layout='full' objectFit='contain' className='w-5/6' />
          <div className='flex md:flex-col md:justify-start flex-row justify-center md:mt-0 mt-20'>
            {/* @ts-ignore */}
            <Card bordered className='my-10'>
              {addedIngredients.map((element, index) => {
                return (
                  <div key={index} id={'el' + element.uuid}>
                    <div className='flex justify-around items-center'>
                      <div>{element.title}</div>
                      {/* @ts-ignore */}
                      <IconButton
                        rounded
                        color='#5E5E5E'
                        bgColor='#E4EBF5'
                        size='small'
                        onClick={() => handleDeleteAnIngredient(element.uuid as string)}
                      >
                        <span style={{ fontSize: '18px', margin: '1px 0px 0px 1px', fontWeight: 'bold' }}>&times;</span>
                      </IconButton>
                    </div>
                    {/* @ts-ignore */}
                    <Divider dense />
                  </div>
                );
              })}
            </Card>
            <GenericButton label='蓋を閉じる' func={() => handleGetRecipes(ingredients)} colour='#FEF4EF' />
            <br className='md:block hidden'></br>
            <GenericButton label='鍋を空にする' func={() => handleDeleteIngredients()} colour='#FEF4EF' />
            <br className='md:block hidden'></br>
          </div>
        </div>
      </div>
    </>
  );
}
