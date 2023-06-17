'use client';
import panImage from '@/assets/panImage.svg';
import GenericButton from '@/components/atoms/GenericButton';
import Header from '@/components/molecules/Header';
import { TypeOfIngredient } from '@/models/TypeOfIngredient.model';
import { useAppSelector } from '@/state/hooks/hooks';
import { appActions, selectGetIngredients } from '@/state/slices/ingredientSlice';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function Confirmation() {
  const router = useRouter();
  const dispatch = useDispatch();
  const ingredients = useAppSelector(selectGetIngredients);

  useEffect(() => {
    // grpcサーバからserver streamingのデータを取得してくる
    // グローバルにそれを保存＋画面から出たら削除する
    const ingredientsOfEveryone: Array<TypeOfIngredient> = [] as Array<TypeOfIngredient>;
    // 👇本当はingredientsOfEveryoneを入れる
    dispatch(appActions.updateIngredients(ingredients));
  }, [dispatch, ingredients]);

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
      <div className='flex flex-col  min-h-screen min-w-screen md:justify-center items-center px-10 justify-start'>
        <Header title='' isSend={true} />
        <div className='w-full h-full flex md:flex-row flex-col grow md:items-end justify-center items-center md:px-10 relative'>
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
