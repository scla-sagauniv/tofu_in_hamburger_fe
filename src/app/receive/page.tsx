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
      <div className='flex flex-col min-h-screen min-w-screen md:justify-center items-center px-10 justify-start'>
        <Header title='提案されたレシピたちです♪' isSend={false} />
        <div className='w-full h-full flex flex-col justify-center items-center lg:px-10'>
          <div className='lg:w-5/6 w-full h-full grid lg:grid-cols-3 lg:gap-10 md:grid-cols-2 grid-cols-1 gap-5'>
            {result}
          </div>
        </div>
      </div>
    </>
  );
}
