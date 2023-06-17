'use client';
import 'ui-neumorphism/dist/index.css';

import Ingredient from '@/components/atoms/Ingredient';
import Header from '@/components/molecules/Header';
import InputBox from '@/components/atoms/InputBox';
import DisabledInputBox from '@/components/atoms/DisabledInputBox';
import { TypeOfIngredient } from '@/models/TypeOfIngredient.model';
import pic from '../../assets/chicken_png.png';
import data from '@/data/mockData.json';

// ***** mock data
const ingredientsData: Array<TypeOfIngredient> = data.data;

export default function Send() {
  // ***** demo
  const ingredients: Array<JSX.Element> = [];

  // delete when it's real ingredients data
  for (let index = 0; index < 9; index++) {
    for (const ingredient of ingredientsData) {
      ingredients.push(<Ingredient ingredient={ingredient} isSend={true} />);
    }
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
        <Header title='材料を選んでください' isSend={true} />
        <div className='w-full h-full flex flex-col justify-center items-center px-10'>
          {/* The following component is not visible on mobile. */}
          <div className='w-full h-full md:grid lg:grid-cols-6 lg:gap-10 md:grid-cols-4 md:gap-5 hidden'>
            {ingredients}
          </div>

          {/* The following component is only for mobile */}
          <select onChange={(e) => handleAddIngredient(e)} className='md:hidden'>
            {ingredientsData.map((element, index) => {
              return (
                <option key={index} value={element.title}>
                  {element.title}
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
