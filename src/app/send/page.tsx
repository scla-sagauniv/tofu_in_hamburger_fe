'use client';
import 'ui-neumorphism/dist/index.css';

import Ingredient from '@/components/atoms/Ingredient';
import Header from '@/components/molecules/Header';
import InputBox from '@/components/atoms/InputBox';
import DisabledInputBox from '@/components/atoms/DisabledInputBox';
import { TypeOfIngredient } from '@/models/TypeOfIngredient.model';
import { useClient } from '@/hooks/Client';
import { IngredientService } from '@/gen/ingredientRain_connect';
import { IngredientOnDb } from '@/gen/ingredientRain_pb';
import { useState } from 'react';

export default function Send() {
  const [ingredientsData, setIngredientsData] = useState<Array<IngredientOnDb>>([]);
  const client = useClient(IngredientService);
  const handleDataFetch = async () => {
    const res = await client.getIngredientList({});
    setIngredientsData(res.ingredients);
  };
  handleDataFetch();

  // ***** demo
  const ingredients: Array<JSX.Element> = [];

  // delete when it's real ingredients data
  for (const ingredient of ingredientsData) {
    const e: TypeOfIngredient = {
      uuid: undefined,
      title: ingredient.titile,
      description: ingredient.description,
      imageUrl: ingredient.imageUrl,
    };
    ingredients.push(<Ingredient ingredient={e} isSend={true} />);
  }

  // グローバルに値を追加する
  const handleAddIngredient = (e: any) => {
    // modalで追加の方はingredient objをグローバルに登録しているがoptionで選択する方はobjをvalueにできないので
    // グローバル登録時にはstring(ingredient.name)とingredientを紐づける必要
    // もしくは，下の送信UIに表示するのは文字だけなのでそのままstringだけグローバルに登録するreducerを用意しても良い
    console.log(e.target.value, 'is added to the list!');
    return null;
  };

  return (
    <>
      <div className='flex flex-col min-h-screen min-w-screen md:justify-center items-center px-10 justify-start'>
        <Header title='材料を選んでください' isSend={true} isReceive={false} />
        <div className='w-full h-full flex flex-col justify-center items-center px-10'>
          {/* The following component is not visible on mobile. */}
          <div className='w-full h-full md:grid lg:grid-cols-6 lg:gap-10 md:grid-cols-4 md:gap-5 hidden'>
            {ingredients}
          </div>

          {/* The following component is only for mobile */}
          <select onChange={(e) => handleAddIngredient(e)} className='md:hidden'>
            {ingredientsData.map((element, index) => {
              return (
                <option key={index} value={element.titile}>
                  {element.titile}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className='my-10 invisible'>
        <DisabledInputBox />
      </div>
      <InputBox />
    </>
  );
}
