'use client';
import 'ui-neumorphism/dist/index.css';

import Ingredient from '@/components/atoms/Ingredient';
import Header from '@/components/morecules/Header';

export default function Send() {
  // ***** demo
  const ingredients: Array<JSX.Element> = [];
  for (let index = 0; index < 36; index++) {
    ingredients.push(<Ingredient />);
  }

  return (
    <>
      <div className='flex flex-col justify-center items-center p-10'>
        <Header title='材料を選んでください' isSend={true} />
        <div className='flex flex-col justify-center items-center'>
          <div className='grid grid-cols-6 grid-rows-3 gap-10 min-h-screen min-w-screen'>{ingredients}</div>
        </div>
      </div>
    </>
  );
}
