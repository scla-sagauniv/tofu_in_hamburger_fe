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

export default function Confirmation() {
  const router = useRouter();
  const client = useClient(IngredientService);
  const dispatch = useDispatch();

  const ingredients = useAppSelector(selectGetIngredients);
  const [res, setRes] = useState<Array<IngredientType>>([]);

  const get = async () => {
    const stream = client.streamIngredient({});
    for await (const el of stream) {
      setRes(el.ingredients);
    }
  };
  dispatch(appActions.updateIngredients(ingredients));

  const [dom, setDom] = useState<Array<JSX.Element>>([]);

  useEffect(() => {
    const removeElement = (index: number) => {
      setDom((prevDom) => {
        const updatedDom = [...prevDom];
        const removed = updatedDom.splice(index, 1);
        console.log(removed, 'Dom is Deleted!');
        return updatedDom;
      });
    };

    for (const [index, element] of Object.entries(ingredients)) {
      let durationTime = Number((Math.random() * 10) % 7);

      const motionDiv = (
        <motion.div
          key={index}
          animate={{ y: '110vh' }}
          transition={{
            delay: durationTime,
            duration: 30,
          }}
          initial={{
            y: '-130vh',
          }}
        >
          <Ingredient ingredient={element} isSend={false} />
        </motion.div>
      );

      setTimeout(() => {
        console.log('here');
        removeElement(Number(index));
      }, 10 * 1000);

      setDom((prevDom) => {
        const newDom = [...prevDom, motionDiv];
        console.log(newDom);
        return newDom;
      });
    }
  }, [ingredients]);

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
          <div className='absolute w-full md:grid lg:grid-cols-6 lg:gap-10 md:grid-cols-4 md:gap-5 hidden'>{dom}</div>
          <Image src={panImage} alt='' layout='full' objectFit='contain' className='w-5/6' />
          <div className='flex md:flex-col md:justify-start flex-row justify-center md:mt-0 mt-20'>
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
