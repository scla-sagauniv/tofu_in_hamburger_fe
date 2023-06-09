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
import { IngredientService, RecipeService } from '@/gen/ingredientRain_connect';
import { Ingredient as IngredientType } from '../../gen/ingredientRain_pb';
import { motion } from 'framer-motion';
import { Card, IconButton, Divider } from 'ui-neumorphism';

export default function Confirmation() {
  const router = useRouter();
  const client = useClient(IngredientService);
  const dispatch = useDispatch();
  const gIngredients = useAppSelector(selectGetIngredients);
  const [ingredients, setIngredients] = useState(gIngredients); 
  const [addedIngredients, setAddedIngredients] = useState<Array<TypeOfIngredient>>([]); // 画面上から消えてゆくingredientsのaccumulation
  const [dom, setDom] = useState<Array<JSX.Element>>([]);

  const [res, setRes] = useState<Array<IngredientType>>([]);
// こうすることで自動的にstreamingは監視するのか？
  const get = async () => {
    const stream = client.streamIngredient({});
    for await (const el of stream) {
      console.log('！！！！プッシュ通知ココまで来てるんだヨ！！！！');
      console.log('data: ', el.ingredients);

      // set Response, reflect it to the global
      setRes(el.ingredients);

      // set current ingredients payload
      setIngredients(el.ingredients);

      // put rain drops on with current ingredients payload
      rainIngredients(el.ingredients);
    }
  };

  // grpcからserver streamingの値を得る
  const startServerStreaming = async () => {
    await get();
    console.log('stream is fetched. Response is here: ', res);
    // globalにstore
    const ingredientsFromEveryone: Array<TypeOfIngredient> = res;
    // previous ingredients + incoming ingredients = new global ingredients
    dispatch(appActions.updateIngredients(ingredients.concat(ingredientsFromEveryone)));
  };

  function handleDeleteAnIngredient(uuid: string) {
    dispatch(appActions.deleteIngredientByUuid(uuid));
    setAddedIngredients((prevIngredients) => prevIngredients.filter((ingredient) => ingredient.uuid !== uuid));
    console.log('An ingredient', uuid, 'is deleted. Now you have', ingredients);
  }

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

  const rainIngredients = (incomingIngredients: IngredientType[]) => {
    console.log('rain', incomingIngredients);
    // const afterDoms = dom;
    incomingIngredients.map((element, index) => {
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
      // afterDomsに更新がかかっていない状態で次の要素をpushするので正しいデータがafterDomsに保持されない?
      // afterDoms.push(motionDiv);
      
      // 更新後の値を利用してmotionDivを追加
      setDom((prevDoms) => [...prevDoms, motionDiv]);

      setTimeout(() => {
        removeElement(Number(index), element);
      }, 10 * 1000);
    });
    // 送信された要素全部
    // console.log('afterDoms', afterDoms);
    console.log('Elements sent:', dom);
  };

  useEffect(() => {
    console.log('dom', dom);
    console.log('gIngredients', gIngredients);
  }, [dom, gIngredients]);

  useEffect(() => {
    startServerStreaming()
  }, []);

  async function handleGetRecipes(ingredients: Array<TypeOfIngredient>) {
    console.log('the ingredients are sent to API server!');
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
        <Header title='' isSend={false} isReceive={false} />
        <div className='w-full h-full flex md:flex-row flex-col grow md:items-end justify-center items-center md:px-10 relative'>
          {/* アイコン降ってくる部分 */}
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
