'use client';
import Header from '@/components/molecules/Header';
import RecipeCard from '@/components/molecules/RecipeCard';

export default function Receive() {
  const result: Array<JSX.Element> = [];
  for (let index = 0; index < 8; index++) {
    result.push(<RecipeCard />);
  }
  return (
    <>
      <div className='flex flex-col  min-h-screen min-w-screen justify-center items-center px-10'>
        <Header title='提案されたレシピたちです♪' isSend={false} />
        <div className='w-full h-full flex flex-col justify-center items-center px-10'>
          <div className='w-5/6 h-full grid grid-cols-3 gap-10'>{result}</div>
        </div>
      </div>
    </>
  );
}
