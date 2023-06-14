'use client';
import 'ui-neumorphism/dist/index.css';

import Ingredient from '@/components/atoms/Ingredient';
import Header from '@/components/molecules/Header';

export default function Send() {
  // ***** demo
  const ingredients: Array<JSX.Element> = [];
  for (let index = 0; index < 36; index++) {
    ingredients.push(<Ingredient />);
  }

  return (
    <>
      <div className='flex flex-col  min-h-screen min-w-screen justify-center items-center px-10'>
        <Header title='材料を選んでください' isSend={true} />
        <div className='w-full h-full flex flex-col justify-center items-center px-10'>
          <div className='w-full h-full grid grid-cols-6 grid-rows-3 gap-10'>{ingredients}</div>
        </div>
      </div>
    </>
  );
}
